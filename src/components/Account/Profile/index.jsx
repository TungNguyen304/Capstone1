import { TiTick } from 'react-icons/ti'
import { AiFillStar } from 'react-icons/ai'
import { RiArrowRightSLine } from 'react-icons/ri'
import {HiOutlineUser} from 'react-icons/hi'
import {MdLockOutline} from 'react-icons/md'
import {AiOutlineArrowRight, AiOutlineMail, AiOutlinePhone} from 'react-icons/ai'
import style from './profile.module.scss'
import Avt from '../../../assets/images/avt.png'
import classNames from 'classnames/bind';
import { useRef } from 'react';
import { useState } from 'react';
const cx = classNames.bind(style)

function Profile() {
    const changeAccountRef = useRef()
    const changeAvtRef = useRef()
    const accountRef = useRef()
    const inputImg = useRef()
    const [path, setPath] = useState()
    const [show, setShow] = useState(false)
    const role = window.location.pathname.includes('/host') ? 2 : 1
    let account = {}
    if (role === 1) {
        account = JSON.parse(localStorage.getItem('account'))
    } else if (role === 2) {
        account = JSON.parse(localStorage.getItem('accountSupplier'))
    }

    function handleDisplayChangeAccount() {
        if(show === true) {
            setShow(false)
        }
        else {
            setShow(true)
        }
    }

    function handleDisplayChangeAvt() {
        accountRef.current.classList.toggle('flex')
        accountRef.current.classList.toggle('hidden')
        changeAvtRef.current.classList.toggle('hidden')
    }

    function autoClick() {
        inputImg.current.click()
    }

    function handleOnChangeImg(event) {
        const newPath = URL.createObjectURL(event.target.files[0])
        setPath(newPath)
    }

    return (<div className={`${cx('profile')} w-full`}>
        <div ref={accountRef} className="w-[1032px] mx-auto flex">
            <div>
                <div className="w-[308px] mr-5 p-6 rounded-lg border border-solid border-normal">
                    <div className='flex flex-col items-center'>
                        <div className='flex justify-center mb-1 select-none'>
                            <img className='w-[128px] h-[128px] rounded-full' src={account && account.image !== "" ? account.image : Avt} alt="" />
                        </div>
                        <div>
                            <div onClick={handleDisplayChangeAvt} className='text-sm font-medium underline cursor-pointer inline-block select-none'>C???p nh???t ???nh</div>
                        </div>
                    </div>
                    <div className='w-full h-[0.5px] bg-normal my-7'></div>
                    <div>
                        <div className='text-xl font-medium mb-3'>???? x??c nh???n</div>
                        <div className='flex items-center'>
                            <TiTick className='text-[green] mr-2'/>
                            S??? ??i???n tho???i
                        </div>
                        <div className='flex items-center'>
                            <TiTick className='text-[green] mr-2'/>
                            Email
                        </div>
                        <div className='flex items-center'>
                            <TiTick className='text-[green] mr-2'/>
                            T??i kho???n
                        </div>
                        <div className='flex items-center'>
                            <TiTick className='text-[green] mr-2'/>
                            M???t kh???u
                        </div>
                    </div>
                </div>
            </div>
            <div className='flex-1'>
                <div className='ml-[40px]'>
                    <div className='text-3xl font-semibold'>Xin ch??o <span>{account.username}</span></div>
                    <div className='text-[#717171] mt-1'>B???t ?????u tham gia v??o <span>{ }</span>{account.startday}</div>
                    <div onClick={(e) => handleDisplayChangeAccount(e)} className='select-none underline font-medium text-sm mt-3 cursor-pointer hover:bg-[#f1eeee] active:scale-[0.95] inline-block p-3 rounded-lg mx-[-12px]'>Thay ?????i t??i kho???n ????ng nh???p</div>
                    {show && <div className='mt-9 border-b border-solid border-normal pb-7'>
                        <div className='px-5'>
                            <div className='flex justify-between mb-5'>
                                <div className='border-b-2 flex-1 mr-10 border-solid border-gray-600'>
                                    <input className='w-[80%] py-2 placeholder:text-gray-600' type="text" placeholder="First Name" defaultValue={account.firstname}/>
                                </div>
                                <div className='border-b-2 flex-1 border-solid border-gray-600'>
                                    <input className='w-[80%] py-2 placeholder:text-gray-600' type="text" placeholder="Last Name" defaultValue={account.lastname}/>
                                </div>
                            </div>
                            <div className='w-full flex items-center border-b-2 border-solid border-gray-600 mb-5'>
                                <input className='w-full py-2 placeholder:text-gray-600' type="text" name="" id="" placeholder="Username" defaultValue={account.username}/>
                                <HiOutlineUser />
                            </div>
                            <div className='w-full flex items-center border-b-2 border-solid border-gray-600 mb-5'>
                                <input className='w-full py-2 placeholder:text-gray-600' type="text" placeholder='Email Address' defaultValue={account.email}/>
                                <AiOutlineMail />
                            </div>

                            <div className='w-full flex items-center border-b-2 border-solid border-gray-600 mb-5'>
                                <input className='w-full py-2 placeholder:text-gray-600' type="text" placeholder='Phone Number' defaultValue={account.phonenumber}/>
                                <AiOutlinePhone />
                            </div>

                            <div className='w-full flex items-center border-b-2 border-solid border-gray-600 mb-5'>
                                <input className='py-2 w-full placeholder:text-gray-600' type="text" name="city" list="gender" placeholder='Gender' defaultValue={account.gender}/>
                                <datalist id='gender'>
                                    <option value="Male" />
                                    <option value="FeMale" />
                                    <option value="Other" />
                                </datalist>
                            </div>
                            <div className='w-full flex items-center border-b-2 border-solid border-gray-600 mb-5'>
                                <input className='w-full py-2 placeholder:text-gray-600' type="text" placeholder='Password' defaultValue={account.password}/>
                                <MdLockOutline />
                            </div>
                            <div className='w-full flex items-center border-b-2 border-solid border-gray-600 mb-8'>
                                <input className='w-full py-2 placeholder:text-gray-600' type="text" placeholder='Confirm Password' defaultValue={account.password}/>
                                <MdLockOutline />
                            </div>
                        </div>
                        <div className='flex justify-between'>
                            <div onClick={(e) => handleDisplayChangeAccount(e)} style={{ "backgroundImage": "linear-gradient(to right, #07D5DF, #7F6DEF, #F408FE)" }} className='text-white font-semibold italic hover:opacity-90 cursor-pointer py-3 px-5 text-center rounded-full min-w-[80px] active:scale-[0.98]'>H???y</div>
                            <button style={{ "backgroundImage": "linear-gradient(to right, #07D5DF, #7F6DEF, #F408FE)" }} className='bg-[#333] text-white py-3 px-10 flex items-center justify-end mx-5 rounded-full hover:opacity-90 active:scale-[0.98]'>
                                <span className='font-semibold italic'>L??u thay ?????i</span>
                                <AiOutlineArrowRight className='text-white ml-2' />
                            </button>
                        </div>
                    </div>}
                    <div className='flex items-center py-7 border-b border-solid border-normal text-xl font-semibold'>
                        <AiFillStar className='mr-2' />
                        <span>
                            <span>0</span> ????nh gi??
                        </span>
                    </div>
                    <div className='p-3 mt-4 text-sm hover:bg-[#f1eeee] active:scale-[0.95] rounded-xl inline-block font-medium underline cursor-pointer'>????nh gi?? c???a b???n</div>
                </div>
            </div>
        </div>

        <div ref={changeAvtRef} className="w-[1032px] mx-auto hidden">
            <div className='w-[768px]'>
                <div className='flex items-center text-[#484848] font-semibold'>
                    <div onClick={handleDisplayChangeAvt} className='hover:underline cursor-pointer'>H??? s??</div>
                    <div className='mx-3'><RiArrowRightSLine /></div>
                    <div>???nh ?????i di???n</div>
                </div>
                <div className='text-3xl text-[#484848] mt-3 mb-7 font-semibold'>
                    ???nh ?????i di???n
                </div>
                <div>
                    <div className='py-2 px-5 bg-[#edefed] text-[#484848] border-t border-l border-r border-solid border-normal'>
                        ???nh ?????i di???n
                    </div>
                    <div className='p-5 border border-solid border-normal flex'>
                        <div className={`w-[225px] h-[225px] bg-normal ${path ? 'rounded-full' : ''}`}>
                            <img className='w-[225px] h-[225px] rounded-full' src={path ? path : account && account.image !== "" ? account.image : Avt} alt="" />
                        </div>
                        <div className='flex-1 ml-5'>
                            <div className={`${cx('description')} font-thin`}>
                                ???nh ?????i di???n cho th???y khu??n m???t c???a b???n c?? th??? gi??p c??c ch??? nh?? v?? kh??ch kh??c l??m quen v???i b???n. Airbnb y??u c???u t???t c??? ch??? nh?? ph???i c?? ???nh ?????i di???n. Ch??ng t??i kh??ng y??u c???u kh??ch ph???i c?? ???nh ?????i di???n, nh??ng ch??? nh?? c?? th??? y??u c???u ??i???u n??y. N???u b???n l?? kh??ch, ngay c??? khi ch??? nh?? y??u c???u b???n ????ng ???nh, h??? s??? kh??ng th??? xem ???nh cho ?????n khi x??c nh???n y??u c???u ?????t ph??ng c???a b???n.
                            </div>
                            <div onClick={autoClick} className='w-full border border-solid border-normal text-center py-2 rounded-md mt-3 cursor-pointer active:scale-[0.9] hover:bg-primary select-none hover:text-white'>
                                T???i l??n t???p t??? m??y t??nh c???a b???n
                                <input ref={inputImg} onChange={handleOnChangeImg} className='hidden' type="file" name="" id="" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>);
}

export default Profile;