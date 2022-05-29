import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";

function Contact() {
  return (
    <Container>
      <h2>Contact page</h2>
      <Card>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Suresh Kumar Mukhiya
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Suresh Kumar Mukhiya has a doctorate in Software Engineering from
            Western Norway University of Applied Sciences (HVL). He is currently
            working as a Senior Software Developer in Tryg Norge, Norway. He has
            an immense interest in Information Systems, Model-Driven Software
            Engineering, Big Data Analysis, Artificial Intelligence and
            Front-end technologies. He has completed a Master's in Information
            Systems from the Norwegian University of Science and Technology
            (NTNU, Norway) with a thesis in processing mining. He also holds a
            bachelor's degree in computer science and information technology
            (BSc.CSIT) from Tribhuvan University, Nepal. He was decorated with
            the Vice-Chancellor's Award for obtaining the highest score. He is a
            passionate photographer and a resilient traveler.
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Share</Button>
          <Button size="small">Learn More</Button>
        </CardActions>
      </Card>
    </Container>
  );
}

export default Contact;
