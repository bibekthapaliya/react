import React,{Component} from 'react';
import {Card,CardImg,CardImgOverlay,CardText,CardBody,CardTitle,Breadcrumb,BreadcrumbItem} from 'reactstrap';
import {Navbar, NavbarBrand,Nav,NavbarToggler,Collapse,NavItem,Jumbotron,Button,Modal,ModalHeader, ModalBody,
    Form, FormGroup, Input, Label,Row,Col } from 'reactstrap';
import {Control,LocalForm,Errors} from 'react-redux-form'
import {Link} from 'react-router-dom'


const maxLength=(len)=>(val)=>!(val)||(val.length<=len);
const minLength = (len) => (val) => val && (val.length >= len);

class CommentForm extends Component{
    constructor(props){
        super(props);


        this.state={
            isModalOpen:false

        };
        this.toggleModal = this.toggleModal.bind(this);


    }
    toggleModal()
    {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }
    handleSubmitComment(values){
        this.toggleModal();
       this.props.addComment(this.props.dishId,values.rating,values.author,values.comment);
    }


    render(){


        return (
            <div>
                <Button outline onClick={this.toggleModal}><span className="fa fa-pencil fa-lg"></span>Submit comment</Button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values) => this.handleSubmitComment(values)}>
                            <FormGroup>

                                    <Label htmlFor="rating">
                                        Rating
                                    </Label>
                                    <Col>
                                        <Control.select model=".rating" id="rating" name="rating" className="form-control">
                                            <option>1</option>
                                            <option>2</option>
                                            <option>3</option>
                                            <option>4</option>
                                            <option>5</option>
                                        </Control.select>
                                    </Col>
                                </FormGroup>
                            <FormGroup>
                                <Label htmlFor="author">Your Name</Label>
                                <Col>
                                <Control.text model=".author" id="author" name="author"
                                              placeholder="Your Name"
                                              className="form-control"
                                              validators={{
                                                  minLength: minLength(3), maxLength: maxLength(15)
                                              }}
                                />
                                </Col>
                                <Errors
                                    className="text-danger"
                                    model=".author"
                                    show="touched"
                                    messages={{
                                        minLength: 'Must be greater than 2 characters',
                                        maxLength: 'Must be 15 characters or less'
                                    }}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="comment" md={2}>Comment</Label>
                                <Col>
                                <Control.textarea model=".comment" id="comment" name="comment"
                                                  rows="12"
                                                  className="form-control"
                                />
                                </Col>
                            </FormGroup>
                            <Button type="submit" value="submit" color="primary">Submit</Button>
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}


     function  RenderComments({comments,addComment,dishId}){
        if (comments==null){
            return (<div></div>)
        }
        const cmmts=comments.map(comment=>{
            return(
                <li key={comment.id}>
                    <p>{comment.comment}</p>
                    <p>{comment.author}
                    &nbsp;
                    {new Intl.DateTimeFormat('en-US',{
                    year:'numeric',
                    month:'long',
                    day:'2-digit'
                    }).format(new Date(Date.parse(comment.date)))
                    }
                    </p>
                </li>
            )
        })
        return(
            <div className='col-12 col-md-5 m-1'>
                <h4>Comments</h4>
                <ul className='list-unstyled'>
                    {cmmts}
                </ul>
                <CommentForm dishId={dishId} addComment={addComment} />
            </div>
        )
    }
   function RenderDish({dish}) {
        if (dish != null) {
            return (
                <div className='col-12 col-md-5 m-1'>
                    <Card>
                     <CardImg width="100%" src={dish.image} alt={dish.name} />
                         <CardBody>
                            <CardTitle>{dish.name}</CardTitle>
                                 <CardText>{dish.description}</CardText>
                         </CardBody>
                    </Card>
                </div>
                    )
                }
                    else {
                    return (<div></div>)
                }
                }

    const DishDetail=(props)=> {


            const dish = props.dish
        if (dish == null) {
            return (<div>  </div>)
                }
                return (
                    <div className="container">
                        <div className="row">
                            <Breadcrumb>
                                <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                                <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                            </Breadcrumb>
                            <div className="col-12">
                                <h3>{props.dish.name}</h3>
                                <hr />
                            </div>
                        </div>
                    <div className='row'>
                        <RenderDish dish={props.dish}/>
                        <RenderComments comments={props.comments} addComment={props.addComment} dishId={props.dish.id}/>

                    </div>
                    </div>
                    );
                }





export default DishDetail;