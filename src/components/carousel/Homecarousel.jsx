import {useEffect} from 'react'
import frontpage from '../../assets/frontpage/s3.jpg'
import hod from '../../assets/Hod/hod.png'

const HomeCarousel = () => {

  useEffect(() => {
    const el = document.getElementById('carouselExampleFade')
    if (el && window.bootstrap) {
      new window.bootstrap.Carousel(el, {
        interval: 3000,
        ride: 'carousel',
      })
    }
  }, [])

  return (
    <div
      id="carouselExampleFade"
      className="carousel slide carousel-fade"
      data-bs-ride="carousel"
      data-bs-interval="3000"
      style={{
        maxWidth: "100%",
        height: "500px",
        overflow: "hidden",
        marginBottom: "30px"
      }}
    >
      <div className="carousel-inner" style={{ height: "100%" }}>
        <div className="carousel-item active" style={{ height: "100%" }}>
          <img 
            src={frontpage} 
            className="d-block w-100" 
            alt="Campus"
            style={{
              height: "100%",
              objectFit: "cover",
              objectPosition: "center"
            }}
          />
        </div>
        <div className="carousel-item" style={{ height: "100%" }}>
          <img 
            src={hod} 
            className="d-block w-100" 
            alt="HOD"
            style={{
              height: "100%",
              objectFit: "cover",
              objectPosition: "center"
            }}
          />
        </div>
        <div className="carousel-item" style={{ height: "100%" }}>
          <img 
            src={frontpage} 
            className="d-block w-100" 
            alt="Campus"
            style={{
              height: "100%",
              objectFit: "cover",
              objectPosition: "center"
            }}
          />
        </div>
      </div>

      <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  )
}

export default HomeCarousel