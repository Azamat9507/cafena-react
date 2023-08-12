import React from "react";
import { Box, Container, Stack } from "@mui/material";
import Typography from "@mui/material/Typography";
import Tab from "@mui/material/Tab";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Button from "@mui/material/Button";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import "../../../css/help.css";

export function HelpPage() {
  /** INITIALIZATIONS **/
  const [value, setValue] = React.useState("1");
  const faq = [
    {
      question: "How is payment made?",
      answer:
        " You can pay through Payme, Visa card and Master card applications!",
    },
    {
      question: "How long does it take for orders to arrive?",
      answer:
        " Orders may be delivered at different times depending on what you have purchased" +
        "                                                purchased. Maximum within 20 minutes!",
    },
    {
      question:
        "Is there a guarantee that my data will be safe if I use the site?",
      answer:
        "Of course, our developers guarantee that your data is safe",
    },
    {
      question: "Who do I contact if I have a problem with the site?",
      answer:
        "Dear customer, please use the mail admin section",
    },
    {
      question:
        "I want to act as a businessman, not a user. What should I do?",
      answer:
        "Dear customer, we ask you to call the phone numbers indicated on the site!",
    },
    {
      question:
        "I am in Korea. I want to order a coffee machine for my family in Uzbekistan. Can I use Visa or MasterCard?",
      answer:
        "Of course, you can order from abroad using not only visa and master, but also paypal! ",
    },
    {
      question:
        "I want to cancel the order but I don't know how to do it",
      answer:
        "To cancel an order, please log in first and cancel your desired order from the My Orders section using the cancel button!",
    },
    {
      question: 
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed qui expedita quos ab iusto ullam?",
      answer:
          "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Commodi eos eum iste exercitationem sequi magnam",
    },
    {
      question: 
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Porro, nam?",
      answer:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere iste alias fuga labore asperiores totam.",
    },
    {
      question:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem, mollitia aspernatur. Modi, veniam voluptatum?",
      answer:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dignissimos id sequi eveniet facere amet.",
    },
    {
      question: "Lorem ipsum dolor sit amet consectetur?",
      answer:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta deleniti officiis omnis sunt.",
    },
    {
      question: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat consequatur expedita aspernatur?",
      answer:
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Magni dignissimos tempore saepe delectus veritatis",
    },
    {
      question:
       " Lorem ipsum dolor sit amet consectetur, adipisicing elit. Non, reprehenderit praesentium. Porro, at.",
      answer:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Reiciendis aut cumque pariatur minima autem?",
    },
    {
      question: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quo obcaecati quidem sit!",
      answer:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fuga necessitatibus id nam odit sequi!",
    },
  ];
  const rules = [
    `Welcome to our Coffee Shop's online platform! To ensure a pleasant and respectful experience for all users, we kindly ask you to adhere to the following rules:`,
    `1. Respectful Communication:`,
    `* Do not engage in any form of harassment, hate speech, or offensive language.
      Keep discussions and comments relevant to the coffee shop and its offerings.`,

    `2. Appropriate Content:`,
    `* Only post content that is related to our coffee shop, its products, services, and events.
      Do not share inappropriate, offensive, or explicit content.`,

    `3. Accurate Information:`,
    `* Provide accurate and honest information when posting reviews, ratings, or comments.
    Do not spread false information or engage in misleading practices.`,
    
    `4. Privacy and Data Security:`,
    `* Do not share personal information, contact details, or sensitive data in public comments or discussions.
    Be cautious when sharing personal information in private messages.`,

    `5. Intellectual Property:`,
    `* Respect copyright and intellectual property rights. Do not share content that you do not have the right to distribute. If sharing images or content from our coffee shop, give appropriate credit.`,
    `6. No Spam or Self-Promotion:`,
    `* Do not engage in spamming or self-promotion of products, services, or websites unrelated to the coffee shop.
    Only share promotional content if it is directly related to coffee shop events or offers.`,

    `7. Feedback and Reviews:`,
    `* Constructive criticism and feedback are welcome, but keep it respectful and focused on improving the coffee shop's experience.
    Do not use reviews or comments to air personal grievances unrelated to the coffee shop.`,

    `8. Community Guidelines:`,
    `* Follow any additional community guidelines or rules provided by the coffee shop.
    Report any violations or inappropriate behavior to the coffee shop's support team.`,
  ];

  /** HANDLERS **/
  const handleChange = (event: any, newValue: string) => {
    setValue(newValue);
  };

  return (
    <div className={"help_page"}>
      <Container maxWidth="lg" sx={{ mt: "50px", mb: "50px" }}>
        <TabContext value={value}>
          <Box className={"help_menu"}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList
                value={value}
                onChange={handleChange}
                aria-label="lab API tabs example"
                style={{ display: "flex", justifyContent: "space-between"}}
              >
                <Tab label="Rules" value={"1"} />
                <Tab label="FAQ" value={"2"} />
                <Tab label="Send an Email" value={"3"} />
              </TabList>
            </Box>
          </Box>
          <Stack>
            <Stack className={"help_main_content"}>
              <TabPanel value={"1"}>
                <Stack className={"theRules_box"}>
                  <Box className={"theRulesFrame"}>
                    {rules.map((ele, number) => {
                      return <p>{ele}</p>;
                    })}
                  </Box>
                </Stack>
              </TabPanel>
              <TabPanel value={"2"}>
                <Stack className={"accordian_menu"}>
                  {faq.map((ele, number) => {
                    return (
                      <Accordion>
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls="panel1a-content"
                          id="panel1a-header"
                        >
                          <Typography>{ele.question}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <Typography>{ele.answer}</Typography>
                        </AccordionDetails>
                      </Accordion>
                    );
                  })}
                </Stack>
              </TabPanel>
              <TabPanel value={"3"}>
                <Stack className={"admin_letter_box"}>
                  <Stack className={"admin_letter_container"}>
                    <Box className={"admin_letter_frame"}>
                      <span>Send an email to Admin</span>
                    </Box>
                    <form
                      action={"#"}
                      method={"POST"}
                      className={"admin_letter_frame"}
                    >
                      <div className={"admin_input_box"}>
                        <label>Name</label>
                        <input
                          type={"text"}
                          name={"mb_nick"}
                          placeholder={"Input your name"}
                        />
                      </div>
                      <div className={"admin_input_box"}>
                        <label>E-mail address</label>
                        <input
                          type={"text"}
                          name={"mb_email"}
                          placeholder={"Input your e-mail address"}
                        />
                      </div>
                      <div className={"admin_input_box"}>
                        <label>Message</label>
                        <textarea
                          name={"mb_msg"}
                          placeholder={"Input your message here"}
                        ></textarea>
                      </div>
                      <Box
                        display={"flex"}
                        justifyContent={"flex-end"}
                        sx={{ mt: "30px" }}
                      >
                        <Button sx={{backgroundColor: "green"}} type={"submit"} variant="contained">
                          Send
                        </Button>
                      </Box>
                    </form>
                  </Stack>
                </Stack>
              </TabPanel>
            </Stack>
          </Stack>
        </TabContext>
      </Container>
    </div>
  )
    
  
}