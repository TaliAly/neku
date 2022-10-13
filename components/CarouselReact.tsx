import { Carousel } from "react-responsive-carousel"
import { BookInfo } from "./Type"
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
      emulateTouch={true}
      swipeable={false}
      stopOnHover={true}
      showStatus={responsive}
      dynamicHeight={false}
      showThumbs={false}
      showArrows={true}
      showIndicators={true}
      animationHandler="fade"
      interval={5000}
    >
      {
        data?.map(({ mal_id, title, images, synopsis, title_japanese }: BookInfo) => {
          return <Tops image={images.webp.image_url} name={title} key={mal_id} mal_id={mal_id} synopsis={synopsis} background={images.webp.large_image_url} japanese_name={title_japanese} />
        })
      }
    </Carousel>
  )
}

export default CarouselReact