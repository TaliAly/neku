import { Carousel } from "react-responsive-carousel"
import { Target } from "./Type"
import useResponsive from "./useResponsive"
import Tops from '../components/library/Tops'
import "react-responsive-carousel/lib/styles/carousel.min.css"

function CarouselReact({ data }: any) {
  const { responsive } = useResponsive()

  return (
    <Carousel
      autoPlay={true}
      centerMode={false}
      infiniteLoop={true}
      emulateTouch={responsive}
      stopOnHover={true}
      showStatus={responsive}
      dynamicHeight={false}
      showThumbs={false}
      showArrows={!responsive}
      showIndicators={!responsive}
    >
      {
        data?.map(({ mal_id, title, images, synopsis }: Target) => {
          return <Tops image={images.webp.image_url} name={title} key={mal_id} mal_id={mal_id} synopsis={synopsis} background={images.webp.large_image_url} />
        })
      }
    </Carousel>
  )
}

export default CarouselReact