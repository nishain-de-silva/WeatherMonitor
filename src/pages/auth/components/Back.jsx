import backIcon from './back.png'
export default ({ onPress }) => {
    return <button
        onClick={onPress}
        className='btn btn-outline-light mx-2'>
        <img src={backIcon} style={{ height: 20, width: 20 }} />
    </button>
}