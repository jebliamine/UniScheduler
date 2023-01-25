import '../App.css';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';


export function Home() {
    return(
      <div className='center' style={ {
        margin: 'auto',
        marginLeft: '30%',
        width:' 70%',
        
    
      }}> 
          {/* <h2>Fh Raumplanung</h2>
        <p>
            mit dieser Webanwendung erhalten Sie Informationen zur Raumplanung der fh aachen campus julich. 
            Sie können auch die Wochenpläne der einzelnen Räume herunterladen.
            </p>
 
       */}
    


{/* 
  <Card style={{ width: '99%',
                 height: '80%'  
                   }}>
  <Card.Img variant="top"   src="../../public/Schedjule2.jpg"  />
  <Card.Body>
    <Card.Title>Fh Raumplanung</Card.Title>
    <Card.Text>
    mit dieser Webanwendung erhalten Sie Informationen zur Raumplanung der fh aachen campus julich. 
    Sie können auch die Wochenpläne der einzelnen Räume herunterladen.
    </Card.Text>
    <Button variant="primary">Go somewhere</Button>
  </Card.Body>
  </Card> */}

  <div className='card' style={{ width: '60%',
                 height: '70%'  
                   }}>
  <img src="https://images.pexels.com/photos/207691/pexels-photo-207691.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" class="card-img-top" alt="..."/>
  <div class="card-body">
    <h5 class="card-title">Card title</h5>
    <p class="card-text"> Mit dieser Webanwendung erhalten Sie Informationen zur Raumplanung der fh aachen campus julich. 
    Sie können auch die Wochenpläne der einzelnen Räume herunterladen.</p>
    <a href="/Search" class="btn btn-primary">Suche starten</a>

    <a href="/Hera" class="btn btn-secondary "  style={{margin: '10px'}}>Raumhierarchie </a>
  </div>
</div>
    </div>

);
}