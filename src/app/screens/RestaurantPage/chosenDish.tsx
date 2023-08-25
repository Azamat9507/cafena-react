import React, { useState, useEffect } from "react";
import { Container, Stack, Box } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import Marginer from "../../components/marginer";
import Button from "@mui/material/Button";
import Rating from "@mui/material/Rating";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { FreeMode, Navigation, Thumbs } from "swiper";
import { Favorite, FavoriteBorder, Star } from "@mui/icons-material";
import Checkbox from "@mui/material/Checkbox";
import { useParams } from "react-router-dom";
import { Product } from "../../../types/product";
import { Restaurant } from '../../../types/user';
import assert from "assert";
import { Definer } from "../../../lib/Definer";
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

//REDUX
import { useDispatch, useSelector} from "react-redux";
import { createSelector } from "reselect";
import { 
  retrieveChosenProduct,
  retrieveChosenRestaurant,
} from "../../screens/RestaurantPage/selector";
import {Dispatch} from "@reduxjs/toolkit";
import  { 
  setChosenProduct, 
  setChosenRestaurant, 
} from "../../screens/RestaurantPage/slice";
import ProductApiService from "../../apiServices/productApiService";
import RestaurantApiService from "../../apiServices/restaurantApiService";
import { serverApi } from "../../../lib/config";
import MemberApiService from "../../apiServices/memberApiService";
import { sweetErrorHandling, sweetTopSmallSuccessAlert } from "../../../lib/sweetAlert";
import { verifiedMemberData } from "../../apiServices/verify";


interface Comment {
  id: number;
  name: string;
  comment: string;
  rating: number;
  productId: string;
}



/** REDUX SLICE */
const actionDispatch = (dispach: Dispatch) => ({
  setChosenProduct: (data: Product) => dispach(setChosenProduct(data)),
  setChosenRestaurant: (data: Restaurant) => dispach(setChosenRestaurant(data)),
});

/** REDUX SELECTOR */
const chosenProductRetriever = createSelector(
  retrieveChosenProduct, 
  (chosenProduct) => ({ 
    chosenProduct, 
  })
);
const chosenRestaurantRetriever = createSelector(
  retrieveChosenRestaurant, 
  (chosenRestaurant) => ({ 
    chosenRestaurant: chosenRestaurant,
  })
);

export function ChosenDish(props: any) {

  const [isHovered1, setIsHovered1] = useState(false);

 const handleMouseEnter1 = () => {
   setIsHovered1(true);
 };

 const handleMouseLeave1 = () => {
   setIsHovered1(false);
 };


  /** INTIALIZATIONS */
  let { dish_id } = useParams<{ dish_id: string}>();
  const { setChosenProduct, setChosenRestaurant } = actionDispatch(useDispatch());
  const {chosenProduct} = useSelector(chosenProductRetriever);
  const {chosenRestaurant} = useSelector(chosenRestaurantRetriever);

  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  const [productRebuild, setProductRebuild] = useState<Date>(new Date());


  const dishRelatedProcess = async () => {
    try {
      const productService = new ProductApiService();
      const product: Product = await productService.getChosenDish(dish_id);
      setChosenProduct(product);
      setProductId(product._id);

      const restaurantService = new RestaurantApiService();
      const restaurant = await restaurantService.getChosenRestaurant(
        product.restaurant_mb_id
      );
      setChosenRestaurant(restaurant);
    } catch(err) {
      console.log(`dishRelatedProcess, ERROR:`, err);
    }
  }

  useEffect(() => {
    dishRelatedProcess().then();
  }, [productRebuild]);

   /** HANDLERS */
  const targetLikeProduct = async (e: any) => {
    try {
      assert.ok(verifiedMemberData, Definer.auth_err1);

      const memberService = new MemberApiService(),
        like_result: any = await memberService.memberLikeTarget({
          like_ref_id: e.target.id,
          group_type: "product",
        });
      assert.ok(like_result, Definer.general_err1);

      await sweetTopSmallSuccessAlert("succes", 700, false);
      setProductRebuild(new Date());
    } catch (err: any) {
      console.log("targetLikeProduct, ERROR:", err);
      sweetErrorHandling(err).then();
    }
  };

  const [rating, setRating] = useState<number | null>(null);
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
const [comments, setComments] = useState<{ [productId: string]: Comment[] }>(
  {}
);
  const [productId, setProductId] = useState<string | undefined>(undefined);

  const [lastCommentId] = useState(0);
  const [ratingError, setRatingError] = useState("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!rating) {
      setRatingError("Rating is required."); // Display an error message
      return;
    }
    const newComment: Comment = {
      id: lastCommentId + 1,
      name,
      comment,
      rating: rating || 0,
    productId: chosenProduct?._id || "",

    };

    // TODO: Implement logic to submit the comment
    submitCommentToServer(newComment);
  };

  const submitCommentToServer = async (comment: Comment) => {
    try {
      const response = await fetch(`${serverApi}/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(comment),
      });
      if (response.ok) {
        const newComment = await response.json();
        const productId = chosenProduct?._id;
        setComments((prevComments) => {
          if (productId) {
            const updatedComments = {
              ...prevComments,
              [productId]: [...(prevComments[productId] || []), newComment],
            };
            return updatedComments;
          }
          return prevComments;
        });

        setName("");
        setComment("");
        setRating(null);
        sweetTopSmallSuccessAlert("Comment submitted!", 800, false);
      } else {
        throw new Error("Failed to submit comment");
      }
    } catch (error) {
      console.error(error);
      sweetErrorHandling(error).then();
    }
  };


useEffect(() => {
  const fetchComments = async () => {
    try {
      if (productId) {
        const response = await fetch(
          `${serverApi}/comments?productId=${productId}`
        );
        if (response.ok) {
          const commentsData = await response.json();
          setComments((prevComments) => ({
            ...prevComments,
            [productId]: commentsData,
          }));
        } else {
          throw new Error("Failed to fetch comments");
        }
      }
    } catch (error) {
      console.error(error);
      // Handle error
    }
  };

  fetchComments();
}, [productId]);



  return (
    <div className="chosen_dish_page">
      <Container className="dish_container">
        <Stack className="chosen_dish_slider">
          <Swiper
            className="dish_swiper"
            loop={true}
            spaceBetween={10}
            navigation={true}
            // SWIPER USED TO HERE
            modules={[FreeMode, Navigation, Thumbs]}
            pagination={{
              clickable: true,
              type: "bullets",
              el: ".swiper-pagination",
            }}

          >
            {chosenProduct?.product_images.map((ele: string) => {
              const image_path = `${serverApi}/${ele}`;
              return (
                //SWIPERSLIDE USED HERE
                <SwiperSlide>
                  <img
                    style={{ 
                      width: "90%", 
                      height: "500px",
                      borderRadius: "10%" 
                    }}
                    src={image_path}
                    alt="product"
                  />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </Stack>
        <Stack className={"chosen_dish_info_container"}>
          <Box className={"chosen_dish_info_box"}>
            <strong className={"dish_txt"}>{chosenProduct?.product_name}</strong>
            <span className={"resto_name"}>{chosenRestaurant?.mb_nick}</span>
            <Box className={"rating_box"}>
              <Rating name="half-rating" defaultValue={3.5} precision={0.5} />
              <div className={"evaluation_box"}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginRight: "20px",
                  }}
                > 
                  <Checkbox
                    {...label}
                    icon={<FavoriteBorder />}
                    checkedIcon={<Favorite style={{ color: "red" }} />}
                    id={chosenProduct?._id}
                    onClick={targetLikeProduct}
                    checked={ 
                      chosenProduct?.me_liked && 
                      chosenProduct?.me_liked[0]?.my_favorite ? true : false
                    }
                  />

                  <span>{chosenProduct?.product_likes}</span>
                </div>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <RemoveRedEyeIcon sx={{ mr: "10px" }} />
                  <span>{chosenProduct?.product_views}</span>
                </div>
              </div>
            </Box>
            <p className={"dish_desc_info"}>{chosenProduct?.product_description
               ? chosenProduct?.product_description 
               : "no description"}
            </p>
            <Marginer
              direction="horizontal"
              height="1"
              width="100%"
              bg="#fff"
            />
            <div className={"dish_price_box"}>
              <span>Price</span>
              <span>${chosenProduct?.product_price}</span>
            </div>
            <div className={"button_box"}>
              <Button
                sx={{backgroundColor: "green"}}
                variant="contained"
                onClick={() => {
                  props.onAdd(chosenProduct);
                }}
                onMouseEnter={handleMouseEnter1}
                onMouseLeave={handleMouseLeave1}
              >
                Add to
                <ShoppingCartIcon style={{marginLeft: "10px"}} />
              </Button>
            </div>
          </Box>
        </Stack> 
      </Container>
      
      <div className="details_comment">Add a comment</div>
      <div className="comment_cont">
        <form onSubmit={handleSubmit} className="comment_cont_form">
          <div>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
              className="comment_cont_input"
              placeholder="Type your name"
            />
          </div>
          <div>
            <label
              htmlFor="comment"
              className="comment_cont_label_comment"
            ></label>
            <textarea
              id="comment"
              value={comment}
              onChange={(event) => setComment(event.target.value)}
              required
              className="comment_cont"
              style={{ width: "1000px", height: "100px" }}
              placeholder="Type your comment here"
            ></textarea>
          </div>
          <div>
            <label htmlFor="rating" className="comment_cont_label"></label>
            <Rating
              name="rating"
              value={rating || 1}
              onChange={(event, value) => setRating(value)}
              className="comment_cont_rating"
            />
            {ratingError && <p style={{color: "red"}}>{ratingError}</p>}
          </div>
          <Stack
            flexDirection={"row"}
            justifyContent={"flex-end"}
            style={{ width: "100%" }}
          >
            <Button
              sx={{ alignContent: "center"}}
              type="submit"
              className="comment_cont_button"
              style={{
                color: isHovered1 ? "#ffffff" : "#ffffff",
                opacity: isHovered1 ? 0.6 : 1,
                backgroundColor: isHovered1 ? "#4d94ff" : "#007bff",
              }}
            >
              Publish
            </Button>
          </Stack>
        </form>

        {comments[chosenProduct?._id ?? ""]?.length > 0 && (
          <div style={{ width: "1000px" }}>
            <h2>Comments:</h2>
            {comments[chosenProduct?._id ?? ""]?.map((comment: Comment) => (
              <div key={comment.id} className="submitted_comment">
                <p className="comment_cont_name">{comment.name}</p>
                {comment.rating && (
                  <p className="comment_cont_rating">
                    {Array(comment.rating)
                      .fill("")
                      .map((_, index) => (
                        <Star key={index} className="star" />
                      ))}
                  </p>
                )}
                <p className="comment_cont_comment">{comment.comment}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}