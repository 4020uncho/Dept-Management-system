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
    >
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img src={frontpage} className="d-block w-100" alt="Campus" />
        </div>
        <div className="carousel-item">
          <img src={hod} className="d-block w-100" alt="HOD" />
        </div>
        <div className="carousel-item">
          <img src={frontpage} className="d-block w-100" alt="Campus" />
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