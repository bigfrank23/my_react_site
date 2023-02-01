import React from "react";
import styled from "styled-components";
import SectionTitle from "./SectionTitle";
import ServicesSectionItem from "./ServicesSectionItem";

const ServicesItemStyles = styled.div`
  padding: 0;
  .services__allItems {
    display: flex;
    gap: 3rem;
    justify-content: center;
    margin-top: 2rem;
    padding-right: 50px;
    padding-top: 12px;
    padding-left: 50px;
    background: linear-gradient(to left, #1a1a1a, #333);
  }
  @media only screen and (max-width: 998px) {
    padding: 0;
    .services__allItems {
      flex-wrap: wrap;
      justify-content: center;
    }
  }

  @media only screen and (max-width: 768px) {
    padding: 0;
    .services__allItems {
      flex-direction: column;
      max-width: 350px;
      margin: 4rem auto;
      gap: 3rem;
    }
  }
`;

function ServiceSection() {
  return (
    <ServicesItemStyles>
      <div className="container-fluid">
        <div className="row d-flex justify-content-center">
          <SectionTitle heading="Services" subheading="what I can do for you" />
          <div className="services__allItems">
            <ServicesSectionItem
              icon={
                <i
                  class="fa fa-code"
                  style={{ color: "#6ea2dd", fontSize: "xxx-large" }}
                />
              }
              title="Web development"
              desc=" My websites are designed with user-friendliness and ease of navigation in mind, providing an enjoyable and seamless experience for your customers.

In addition, all of my websites are fully responsive and optimized for all devices, ensuring that your customers can access your website from anywhere, at any time. I also prioritize search engine optimization (SEO) in my website builds, making it easier for your customers to find you online.

My websites are highly customizable, ensuring that they meet your specific needs and preferences. Whether you need to add new features, change the design, or update content, the website can be easily adapted to suit your needs.

Furthermore, I design my websites with user engagement in mind, through features such as interactive forms, blog integration, and social media integration. By fostering engagement, you can build stronger relationships with your customers and grow your business."
            />
            <ServicesSectionItem
              icon={
                <i
                  class="fa fa-gamepad"
                  style={{ color: "#cf96c2", fontSize: "xxx-large" }}
                />
              }
              title="Game development"
              desc="Are you looking for a way to engage and entertain your customers through a custom app or game? Look no further. My app and game development services are designed to provide a unique and enjoyable experience for your users.

With my expertise in user experience and user interface design, I create apps and games that are intuitive and easy to use. I also optimize my creations for different devices and platforms, so your customers can access them from anywhere, at any time.

Not only do my apps and games provide an enjoyable experience, but they also have the potential to drive engagement and increase customer loyalty. With features such as gamification, social media integration, and real-time updates, your customers will have a reason to keep coming back.

Let me bring my expertise in app and game development to your business. Together, we can create a custom app or game that will help you stand out and connect with your customers in a meaningful way.

I look forward to hearing from you and discussing the potential of a custom app or game for your business."
            />
            <ServicesSectionItem
              icon={
                <i
                  class="fa fa-mobile"
                  style={{ color: "#f2cd5f", fontSize: "xxx-large" }}
                />
              }
              title="Mobile app development"
              desc="I specialize in creating user-friendly apps with a strong focus on cross-platform compatibility. Your customers will be able to access your app from any device and operating system, ensuring maximum reach and accessibility.

With a commitment to performance, stability, and scalability, I guarantee that your app will run smoothly and provide a positive user experience. And with the ability to customize your app to meet your unique needs and goals, I can help you stand out and connect with your customers in a meaningful way."
            />
          </div>
        </div>
      </div>
    </ServicesItemStyles>
  );
}

export default ServiceSection;
