import Header from "../../../components/common/Header";
import Footer from "../../../components/common/Footer";
import BigBox from "../../../components/Home/BigBox";
import Map from '../../../components/common/Map'
import Comment from "../../../components/Room/Comment";
import Avt from '../../../assets/logo/avt.svg'
import Avt2 from '../../../assets/images/avt.png'
import imageApi from "../../../api/imageApi";
import { useSelector } from "react-redux";
import {GrStar} from 'react-icons/gr'
import { AiFillStar } from 'react-icons/ai'
import { TiHeartFullOutline, TiLocation } from 'react-icons/ti'
import { MdVerifiedUser } from 'react-icons/md'
import { useValueContext } from "../../../hook";
import commentApi from "../../../api/commentApi";
import Scroll from 'react-scroll'
import style from './room.module.scss'
import classNames from 'classnames/bind';
import { Fragment, useEffect, useState } from "react";
const cx = classNames.bind(style)

function Room({type, title}) {

    const [commentList, setCommentList] = useState([])
    const [imageList, setImageList] = useState([])
    const [totalComment, setTotalComment] = useState(0)
    const value = useValueContext()
    const service = JSON.parse(localStorage.getItem('service'))
    const account = JSON.parse(localStorage.getItem('account'))
    const show = useSelector(state => state.bigboxReducer.show)
    let count = 0;


    useEffect(() => {
        var scroll = Scroll.animateScroll;
        scroll.scrollToTop({
            duration: 500,
            smooth: true
        });

        
    })

    useEffect(() => {
        const count = commentList ? commentList.reduce((total, currentValue) => {
            if(currentValue.placeid === service.id) {
                return total + 1
            }
            return total
        }, 0) : 0;
        setTotalComment(count)
    }, [count, commentList, service])


    useEffect(() => {
        (async () => {
            const data = await commentApi.getAll()
            setCommentList(data.data)
        })()
    }, [])

    useEffect(() => {
        (async () => {
            const data = await imageApi.get(`?placeid=${service.id}`)
            setImageList(data.data)
        })()
    }, [])

    
    function handleLike(even) {
        even.stopPropagation()
        if(localStorage.getItem('account')) {
            if(even.target.style.fill !== 'var(--color_heart)'){
                value.handleSetBigBox('Danh s??ch y??u th??ch c???a b???n', 'interests')
                value.handleDisplayBigBox()
                // even.target.style.fill = 'var(--color_heart)'
            }
            else
                even.target.style.fill = 'rgba(0, 0, 0, 0.6)'
        }
        else {
            value.handleSetBigBox('Ch??o m???ng b???n ?????n v???i GreenMap', 'login')
            value.handleDisplayBigBox()
        }
    }
    

    function handleDisplayComment(e) {
        value.handleSetBigBox('', 'comment')
        value.handleDisplayBigBox()
    }

    return ( <div className={`${cx("room")}`}>
        <Header/>
        <div className={`small_wrap my-[100px]`}>
            <div className="text-2xl font-semibold">
                {service.name}
            </div>

            <div className="flex justify-between cursor-pointer mt-3 mb-5">
                <div className="flex">
                    <div className="flex items-center mr-5">
                        <AiFillStar/>
                        <span>{service.star}</span>
                    </div>
                    <div className="flex underline mr-5">
                        <div><span>180</span> ????nh gi??</div>
                    </div>
                    <div className="flex items-center underline">
                        <TiLocation/>
                        {service.address}
                    </div>
                </div>
                <div onClick={(e) => handleLike(e)} className="flex items-center underline active:scale-[0.8] select-none">
                    <TiHeartFullOutline style={{'fill': 'white', 'stroke': 'black', 'strokeWidth': '1px'}} className="text-base w-[24px] h-[20px] select-none mr-1"/>
                    <span>L??u</span>
                </div>
            </div>

            <div className="flex h-[390px] rounded-xl overflow-hidden">
                <div className="flex-1 h-full mr-2">
                    <img className="h-full w-full hover:brightness-[0.8] cursor-pointer" src={imageList.length && imageList[0].name} alt="" />
                </div>
                <div className="flex-1 flex flex-col h-full">
                    <div className="flex-1 flex h-[50%] mb-2">
                        <div className="flex-1 h-full mr-2">
                            <img className="h-full w-full hover:brightness-[0.8] cursor-pointer" src={imageList.length && imageList[1].name} alt="" />
                        </div>
                        <div className="flex-1">
                            <img className="h-full w-full hover:brightness-[0.8] cursor-pointer" src={imageList.length && imageList[2].name} alt="" />
                        </div>
                    </div>
                    <div className="flex-1 flex h-50%">
                        <div className="flex-1 h-full mr-2">
                            <img className="h-full w-full hover:brightness-[0.8] cursor-pointer" src={imageList.length && imageList[3].name} alt="" />
                        </div>
                        <div className="flex-1">
                            <img className="h-full w-full hover:brightness-[0.8] cursor-pointer" src={imageList.length && imageList[4].name} alt="" />
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="flex mt-9">
                <div className="w-[50%] border-t border-solid border-normal pt-6">
                    <div className="flex justify-between items-center">
                        <div className="text-2xl font-semibold mb-3">
                            <span>Ng?????i ????ng k??: {service.host}</span>
                        </div>
                        <div>
                            <div className="inline-block rounded-full overflow-hidden">
                                <img className="w-[56px] h-[56px] " src="https://a0.muscache.com/im/pictures/user/237512e2-5c40-40e9-86de-6a7c84e6882b.jpg?im_w=240" alt="" />
                            </div>
                        </div>
                    </div>
                    <div className=" pb-6">
                        {service.description}
                    </div>
                </div>


                <div className="w-[50%]"></div>
            </div>

            <div className={`${cx('comment')} mt-6 border-t border-solid border-normal pt-9`}>
                <div className="flex items-center text-2xl mb-4">
                    <div className="flex items-center">
                        <GrStar/>
                        {service.star}
                    </div>
                    <div className="px-3"> - </div>
                    <div>{totalComment} ????nh gi??</div>
                </div>
                <div className="mb-5">
                    <div className="grid grid-cols-2">
                        {commentList.map((item, index) => {
                            if(count<6) {
                                if(item.placeid === service.id) {
                                    count++;
                                    return <Comment key={index} name={item.username} date={item.date} content={item.content} image={item.image}/>
                                }
                                else return <Fragment key={index}></Fragment>
                            }
                            else return <Fragment key={index}></Fragment>
                        })}
                    </div>
                    {totalComment >= 6 && <div onClick={(e) => handleDisplayComment(e)} className="border border-solid border-black rounded-xl inline-block py-3 px-5 cursor-pointer hover:bg-slate-100 active:scale-[0.98] font-semibold">
                        Hi???n th??? t???t c??? {totalComment} ????nh gi??
                    </div>}
                </div>
                <div className={`w-[50%]`}>
                    <div>
                        <div className="flex items-center mb-6">
                            <div className="mr-5 text-xl font-semibold italic">{account && account.username}</div>
                            <div>
                                <img className="w-[56px] h-[56px] rounded-full" src={account && account.image!=="" ? account.image : account ? Avt2 : Avt} alt="" />
                            </div>
                        </div>
                        <div>
                            <div><label htmlFor="comment" className="text-[#5c5959] text-start">Nh???n x??t c???a b???n</label></div>
                            <div className="flex justify-between items-center w-full">
                                <textarea id="comment" type="text" placeholder="Comment ..." className="outline-none mr-5 py-3 px-4 flex-1 border border-solid border-normal placeholder:italic" />
                                <div className="flex flex-col">
                                    <button style={{'backgroundColor': 'var(--primary)', "backgroundImage": "linear-gradient(to right, #07D5DF, #7F6DEF, #F408FE)"}} className="hover:brightness-90 active:scale-[0.98] text-white py-2 px-4 rounded-full italic mb-3">G???i ??i</button>
                                    <button style={{'backgroundColor': 'var(--primary)', "backgroundImage": "linear-gradient(to right, #07D5DF, #7F6DEF, #F408FE)"}} className="hover:brightness-90 active:scale-[0.98] text-white py-2 px-4 rounded-full italic">?????n trang ????nh gi??</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="w-full h-[70vh] mt-6">
                <Map serviceRoom={service}/>
            </div>

            <div className="mt-6">
                <div className="flex items-center">
                    <div className="mr-5">
                        <img className="w-[64px] h-[64px] rounded-full" src="https://a0.muscache.com/im/pictures/user/237512e2-5c40-40e9-86de-6a7c84e6882b.jpg?im_w=240" alt="" />
                    </div>
                    <div>
                        <div className="text-lg font-semibold">Ng?????i ????ng k??: {service.host}</div>
                        <div>???? tham gia v??o th??ng {service.startday.slice(3,5)} n??m {service.startday.slice(6,10)}</div>
                    </div>
                </div>
                <div className="flex mt-4">
                    <div className="flex items-center mr-6">
                        <AiFillStar className="mr-2"/>
                        <span>438 ????nh gi??</span>
                    </div>
                    <div className="flex items-center">
                        <MdVerifiedUser className="mr-2"/>
                        <span>???? x??c minh danh t??nh</span>
                    </div>
                </div>
            </div>
        </div>
        {show && <div>
                <BigBox title={title} type={type} handleDisplayBigBox={value.handleDisplayBigBox}/>
        </div>}
        <Footer/>
    </div> );
}

export default Room