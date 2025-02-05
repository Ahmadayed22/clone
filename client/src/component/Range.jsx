
import PropTypes from 'prop-types';
const Range = ({ name, image }) => {
    return (

        <div className='flex flex-col items-center '>
            <img src={image} width={400} height={400} alt="" className='rounded' />
            <span className='mt-4 font-bold text-2xl'>{name}</span>
        </div>

    )
}
Range.propTypes = {
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired
};
export default Range