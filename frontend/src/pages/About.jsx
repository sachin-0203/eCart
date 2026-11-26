import InformationPage from "../components/sections/InformationPage";

const About = () => (
  <InformationPage
    page={{
      eyebrow: "About Rashmi Enterprises",
      title: "A little something for every day.",
      intro:
        "Rashmi Enterprises brings a considered mix of fashion, footwear, beauty, electronics, and home essentials together in one place.",
      sections: [
        {
          title: "A collection for more of life",
          paragraphs: [
            "From everyday style to useful home and lifestyle finds, our store brings a range of categories together so you can explore what suits you.",
            "We are building a more convenient way to discover products, compare your options, and shop in one place.",
          ],
        },
        {
          title: "Here when you need us",
          paragraphs: [
            "Have a question about a product or an order? Our Contact Us page is the best place to send a message to the team.",
          ],
        },
      ],
    }}
  />
);

export default About;
