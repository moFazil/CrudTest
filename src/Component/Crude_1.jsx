import axios from "axios";
import { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import DeleteConfirmation from "./DeleteConformation";
 
function AllFruits() {
  const [allFruits, setAllFruits] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [itemToDeleteId, setItemToDeleteId] = useState(0);

  const openConfirmDeleteModalHandler = (id) => {
    setShowModal(true);
    setItemToDeleteId(id);
  };
 
  const hideDeleteModalHandler = () => {
    setShowModal(false);
    setItemToDeleteId(0);
  };
 
  const confirmDeleteHandler = () => {
    axios
      .delete(`http://localhost:4000/fruits/${itemToDeleteId}`)
      .then((response) => {
        setAllFruits((previousState) => {
          return previousState.filter((_) => _.id !== itemToDeleteId);
        });
        setItemToDeleteId(0);
        setShowModal(false);
      });
  };
 
  useEffect(() => {
    axios.get("http://localhost:4000/fruits").then((response) => {
      setAllFruits(response.data);
    });
  }, []);
  const navigate = useNavigate();
 
  return (
    
    <>
    <DeleteConfirmation
        showModal={showModal}
        hideDeleteModalHandler={hideDeleteModalHandler}
        title="Delete Confirmation"
        body="Are you want delete this itme?"
        confirmDeleteHandler={confirmDeleteHandler}
      ></DeleteConfirmation>
      <Row xs={1} md={3} className="g-2">
        {allFruits.map((item) => (
          <Col key={item.id}>
            <Card>
              <Card.Img variant="top" src={item.imageUrl}style={{width:"300px"}} />
              
                <Card.Title>{item.name}</Card.Title>
                <Card.Text>Quantity(KG Units) - {item.quantity}</Card.Text>
                <Card.Text>Price - {item.price}</Card.Text>
                <Card.Body>
	<Card.Title>{item.name}</Card.Title>
	<Card.Text>Quantity(KG Units) - {item.quantity}</Card.Text>
	<Card.Text>Price - {item.price}</Card.Text>
	<Button
	  variant="primary"
	  onClick={() => navigate(`/up/${item.id}`)}
	>
	  Edit
	</Button>
  <Button
                  variant="danger"
                  onClick={() =>{openConfirmDeleteModalHandler(item.id)}}
                >
                  Delete
                </Button>

              </Card.Body>
              
            </Card>
           
          </Col>
        ))}
      </Row>
      <Row className="mt-2">
        <Col md={{ span: 4, offset: 4 }}>
          <Button variant="primary" onClick={() => navigate("/add-fruits")}>
            Add New Fruit
          </Button>
        </Col>
      </Row>
    </>
  );
}
export default AllFruits;