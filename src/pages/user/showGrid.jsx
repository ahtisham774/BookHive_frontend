
import { PropTypes } from 'prop-types';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';

const ShowGrid = ({ images }) => {

    return (
        <ResponsiveMasonry
            columnsCountBreakPoints={{ 350: 1, 1900: 2 }}

        >
            <Masonry
                gutter="12px"
            >

                {images?.map((file, index) => (
                    <img
                        key={index}
                        src={file}
                        alt={`Book image ${index + 1}`}
                        className="w-full h-96 object-cover rounded-md"
                    />
                ))}

            </Masonry>
        </ResponsiveMasonry>
    )
}
ShowGrid.propTypes = {
    images: PropTypes.array,
}
export default ShowGrid