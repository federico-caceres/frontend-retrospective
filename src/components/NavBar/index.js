import { Container, Navbar, Image } from 'react-bootstrap';
import logo from '../../assets/logo.png';

export default function NavBar(){
    return (
        <Navbar className="navbar">
        <Container>
          <Navbar.Brand href='#home'>
            <Image
                src={logo}
                width="60"
                height="60"
                className="d-inline-block align-top"
                alt="React Bootstrap logo"
              />
          </Navbar.Brand>
          <div style={{color: 'white'}}>
            <h1>Retrospective project</h1>
          </div>          
        </Container>
      </Navbar>   
    )
}