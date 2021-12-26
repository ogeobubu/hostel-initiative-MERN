import styled from "styled-components";

const Section = styled.section`
display: flex;
justify-content: center;
align-items: center;
`;
const Text = styled.span`
font-family: Lato;
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 45px;
  color: #8f8f8f;
  margin-bottom: 6px;
`;

const NoData = () => {
  return (
    <Section>
      <Text>Server error: An error occured please try again later.</Text>
    </Section>
  );
};

export default NoData;
