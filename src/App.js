import { useState, useEffect } from 'react';
import { useToasts } from 'react-toast-notifications';
import FeatherIcon from 'feather-icons-react';
import { AnimatePresence, motion } from 'framer-motion';
import './styles/main.css';
import './styles/input.css';
import { calc, validateData } from './calc';

function App() {
	const [byte1, setByte1] = useState('0');
	const [byte2, setByte2] = useState('0');
	const [byte3, setByte3] = useState('0');
	const [byte4, setByte4] = useState('0');
	const [num1, setNum1] = useState(0);
	const [num2, setNum2] = useState(0);
	const [num3, setNum3] = useState(0);
	const [num4, setNum4] = useState(0);
	const [recvByte1, setRecvByte1] = useState('0');
	const [recvByte2, setRecvByte2] = useState('0');
	const [recvByte3, setRecvByte3] = useState('0');
	const [recvByte4, setRecvByte4] = useState('0');
	const [checksum, setCheckSum] = useState('0');
	const [isSend, setSend] = useState(false);
	const [isLoading, setLoading] = useState(false);
	const [isValid, setValid] = useState(false);
	const [isValidLoading, setValidLoading] = useState(false);

	const { addToast } = useToasts();

	const onHandleClick = (e) => {
		const name = e.target.name;
		let data = e.target.value;
		const num = data;

		if (isNaN(parseInt(data))) {
			addToast('Please enter number 🙏', {
				appearance: 'error',
				autoDismissTimeout: 4000,
				autoDismiss: true,
			});
		}

		if (parseInt(data) >= 0 && parseInt(data) <= 255) {
			if (data !== '') {
				data = ('00000000' + parseInt(data).toString(2)).substr(-8);
				// data = parseInt(data).toString(2);
				if (name === `input-1`) {
					setNum1(num);
					setByte1(data);
				} else if (name === `input-2`) {
					setNum2(num);
					setByte2(data);
				} else if (name === `input-3`) {
					setNum3(num);
					setByte3(data);
				} else if (name === `input-4`) {
					setNum4(num);
					setByte4(data);
				} else if (name === 'reinput-1') {
					setRecvByte1(data);
				} else if (name === 'reinput-2') {
					setRecvByte2(data);
				} else if (name === 'reinput-3') {
					setRecvByte3(data);
				} else if (name === 'reinput-4') {
					setRecvByte4(data);
				}
			}
		} else {
			addToast('Please enter number between 0 to 255 🙏', {
				appearance: 'error',
				autoDismissTimeout: 4000,
				autoDismiss: true,
			});
		}
	};

	const onSendHandle = () => {
		setLoading(true);
		setTimeout(() => {
			setSend(true);
			setLoading(false);
		}, 3000);
	};

	let timer = 0;

	useEffect(() => {
		validate();
		setRecvByte1(byte1);
		setRecvByte2(byte2);
		setRecvByte3(byte3);
		setRecvByte4(byte4);
		// eslint-disable-next-line
	}, [checksum]);

	useEffect(() => {
		validate();
		// eslint-disable-next-line
	}, [recvByte1, recvByte2, recvByte3, recvByte4]);

	const findChecksum = () => {
		const value = [byte1, byte2, byte3, byte4];
		setCheckSum(calc(value));
	};

	const validate = () => {
		const value = [recvByte1, recvByte2, recvByte3, recvByte4, checksum];
		if (timer) {
			clearTimeout(timer);
		}

		setValidLoading(true);

		timer = setTimeout(() => {
			setValidLoading(false);
			setValid(validateData(value, checksum));
		}, 4000);
	};

	const onResetHandle = () => {
		setLoading(true);

		setTimeout(() => {
			setSend(false);
			setLoading(false);
		}, 2000);
	};

	return (
		<div className='App h-full lg:h-screen w-screen bg-gray-900 flex justify-center items-center'>
			<div className='flex flex-col items-center border-opacity-60 rounded-md shadow-sm h-4/5 w-11/12 bg-gray-800'>
				<p className='text-2xl text-gray-400 pt-4 pb-4 opacity-40'> Enter number in below boxes 👇</p>
				<span className='self-start mx-3 mb-2 text-xl text-white'>🙋‍ Sender</span>
				<div className='flex flex-col lg:flex-row w-full'>
					<div className='flex mb-3 lg:mb-0 mr-0 lg:mr-2'>
						<input
							type='number'
							name='input-1'
							className='border-1 rounded-lg border-gray-600 bg-gray-600 px-1 py-5 text-center text-indigo-200 text-2xl font-semibold focus:outline-none focus:ring-4 w-full focus:ring-blue-600 mx-3'
							placeholder='1'
							onChange={onHandleClick}
						/>
					</div>
					<div className='flex mb-3 lg:mb-0 mr-0 lg:mr-2'>
						<input
							type='number'
							name='input-2'
							className='border-1 rounded-lg border-gray-600 bg-gray-600 px-1 py-5 text-center text-indigo-200 text-2xl font-semibold focus:outline-none focus:ring-4 focus:ring-blue-600 mx-3 w-full'
							placeholder='1'
							onChange={onHandleClick}
						/>
					</div>
					<div className='flex mb-3 lg:mb-0 mr-0 lg:mr-2'>
						<input
							type='number'
							name='input-3'
							className='border-1 rounded-lg border-gray-600 bg-gray-600 px-1 py-5 text-center text-indigo-200 text-2xl font-semibold focus:outline-none focus:ring-4 focus:ring-blue-600 mx-3 w-full'
							placeholder='1'
							onChange={onHandleClick}
						/>
					</div>
					<div className='flex mb-3 lg:mb-0 mr-0 lg:mr-2'>
						<input
							type='number'
							name='input-4'
							className='flex border-1 rounded-lg border-gray-600 bg-gray-600 px-1 py-5 text-center text-indigo-200 text-2xl font-semibold focus:outline-none focus:ring-4 focus:ring-blue-600 mx-3 w-full'
							placeholder='1'
							onChange={onHandleClick}
						/>
					</div>

					<div className='flex flex-1 mb-3 lg:mb-0 mr-0 lg:mr-2'>
						<button
							onClick={findChecksum}
							className='bg-blue-600 py-2 px-8 rounded-xl text-xl text-white w-full mx-3'>
							Find Checksum
						</button>
					</div>
				</div>
				<div className='flex flex-col lg:flex-row justify-evenly w-full py-10'>
					<div className='flex mb-3 lg:mb-0 mr- lg:mr-2 w-full'>
						<span className='border-1 rounded-lg border-gray-600 bg-gray-600 px-1 py-5 text-center text-indigo-200 text-2xl font-semibold w-full mx-3 '>
							{byte1}
						</span>
					</div>
					<div className='flex mb-3 lg:mb-0 mr-0 lg:mr-2 w-full'>
						<span className='border-1 rounded-lg border-gray-600 bg-gray-600 px-1 py-5 text-center text-indigo-200 text-2xl font-semibold w-full mx-3 '>
							{byte2}
						</span>
					</div>
					<div className='flex mb-3 lg:mb-0 mr-0 lg:mr-2 w-full'>
						<span className='border-1 rounded-lg border-gray-600 bg-gray-600 px-1 py-5 text-center text-indigo-200 text-2xl font-semibold w-full mx-3 '>
							{byte3}
						</span>
					</div>
					<div className='flex mb-3 lg:mb-0 mr-0 lg:mr-2 w-full'>
						<span className='border-1 rounded-lg border-gray-600 bg-gray-600 px-1 py-5 text-center text-indigo-200 text-2xl font-semibold w-full mx-3 '>
							{byte4}
						</span>
					</div>
					<div className='flex mb-3 lg:mb-0 mr-0 lg:mr-2 w-full'>
						<span className='border-1 rounded-lg bg-gray-400 px-1 py-5 text-center text-indigo-100 text-2xl font-semibold w-full  border-red-400 mx-3'>
							{checksum}
						</span>
					</div>
				</div>

				{/* send button */}
				{!isSend && (
					<div className='flex mb-3 lg:mb-0 mr-0 lg:mr-2 w-full lg:w-min'>
						<button
							onClick={onSendHandle}
							className='flex items-center bg-blue-700 py-3 px-5 rounded-md text-xl text-white w-full'>
							Send
							{isLoading && (
								<motion.span
									className='ml-2'
									animate={{ rotate: 360 }}
									transition={{ ease: 'linear', duration: 2, repeat: Infinity }}>
									<FeatherIcon icon='refresh-cw' />
								</motion.span>
							)}
						</button>
					</div>
				)}

				{/* reciver side */}
				<AnimatePresence>
					{isSend && (
						<>
							<span className='self-start mx-3 mb-1 text-xl text-white'>🙋‍♂️ Receiver</span>
							<span className='self-start mx-3 mb-2 text-gray-300 text-base'>
								You can modify also below boxes
							</span>
							<motion.div
								initial={{ opacity: 0 }}
								animate={{ opacity: 1, duration: 2 }}
								exit={{ opacity: 0 }}
								className='flex flex-col lg:flex-row w-full'>
								<div className='flex mb-3 lg:mb-0 mr-0 lg:mr-2'>
									<input
										type='number'
										name='reinput-1'
										defaultValue={num1}
										className='border-1 rounded-lg border-gray-600 bg-gray-600 px-1 py-5 text-center text-indigo-200 text-2xl font-semibold focus:outline-none focus:ring-4 w-full focus:ring-blue-600 mx-3'
										placeholder='1'
										onChange={onHandleClick}
									/>
								</div>
								<div className='flex mb-3 lg:mb-0 mr-0 lg:mr-2'>
									<input
										type='number'
										name='reinput-2'
										defaultValue={num2}
										className='border-1 rounded-lg border-gray-600 bg-gray-600 px-1 py-5 text-center text-indigo-200 text-2xl font-semibold focus:outline-none focus:ring-4 focus:ring-blue-600 mx-3 w-full'
										placeholder='1'
										onChange={onHandleClick}
									/>
								</div>
								<div className='flex mb-3 lg:mb-0 mr-0 lg:mr-2'>
									<input
										type='number'
										name='reinput-3'
										defaultValue={num3}
										className='border-1 rounded-lg border-gray-600 bg-gray-600 px-1 py-5 text-center text-indigo-200 text-2xl font-semibold focus:outline-none focus:ring-4 focus:ring-blue-600 mx-3 w-full'
										placeholder='1'
										onChange={onHandleClick}
									/>
								</div>
								<div className='flex mb-3 lg:mb-0 mr-0 lg:mr-2'>
									<input
										type='number'
										name='reinput-4'
										defaultValue={num4}
										className='flex border-1 rounded-lg border-gray-600 bg-gray-600 px-1 py-5 text-center text-indigo-200 text-2xl font-semibold focus:outline-none focus:ring-4 focus:ring-blue-600 mx-3 w-full'
										onChange={onHandleClick}
									/>
								</div>
								<div className='flex flex-1 mb-3 lg:mb-0 mr-0 lg:mr-2'>
									{isValidLoading ? (
										<div className='flex w-full justify-center items-center bg-blue-500 py-3 px-5 rounded-md text-xl text-white'>
											<motion.span
												animate={{ rotate: 360 }}
												transition={{ ease: 'linear', duration: 2, repeat: Infinity }}>
												<FeatherIcon icon='refresh-cw' />
											</motion.span>
										</div>
									) : isValid ? (
										<div className='flex justify-center border-1 rounded-lg bg-green-500 px-1 py-5 text-indigo-100 text-2xl font-semibold  mx-3  w-full'>
											&nbsp;
											<FeatherIcon icon='check' size={40} />
										</div>
									) : (
										<div className='flex justify-center border-1 rounded-lg bg-red-500 px-1 py-5 text-indigo-100 text-2xl font-semibold  mx-3 w-full'>
											&nbsp;
											<FeatherIcon icon='x' size={40} />
										</div>
									)}
								</div>
							</motion.div>

							<div className='flex flex-col lg:flex-row justify-evenly w-full py-10'>
								<div className='flex mb-3 lg:mb-0 mr-0 lg:mr-2 w-full'>
									<span className='border-1 rounded-lg border-gray-600 bg-gray-600 px-1 py-5 text-center text-indigo-200 text-2xl font-semibold  w-full mx-3 '>
										{recvByte1}
									</span>
								</div>
								<div className='flex mb-3 lg:mb-0 mr-0 lg:mr-2 w-full'>
									<span className='border-1 rounded-lg border-gray-600 bg-gray-600 px-1 py-5 text-center text-indigo-200 text-2xl font-semibold  w-full mx-3 '>
										{recvByte2}
									</span>
								</div>
								<div className='flex mb-3 lg:mb-0 mr-0 lg:mr-2 w-full'>
									<span className='border-1 rounded-lg border-gray-600 bg-gray-600 px-1 py-5 text-center text-indigo-200 text-2xl font-semibold  w-full mx-3 '>
										{recvByte3}
									</span>
								</div>
								<div className='flex mb-3 lg:mb-0 mr-0 lg:mr-2 w-full'>
									<span className='border-1 rounded-lg border-gray-600 bg-gray-600 px-1 py-5 text-center text-indigo-200 text-2xl font-semibold  w-full mx-3 '>
										{recvByte4}
									</span>
								</div>
								{!isValid && (
									<div className='flex mb-3 lg:mb-0 mr-0 lg:mr-2 w-full'>
										<span
											name='byteinput-4'
											className='px-1 py-5  text-red-400 text-xl font-semibold text-center w-full border-red-400'>
											Incoming data are modified 👆
										</span>
									</div>
								)}
							</div>

							{/* Reset Button */}
							<div className='flex justify-center items-center mb-3 lg:mb-0 mr-0 lg:mr-2 w-full lg:w-min'>
								<button
									onClick={onResetHandle}
									className='flex items-center bg-blue-700 py-3 px-5 rounded-md text-xl text-white w-full'>
									Reset
									{isLoading && (
										<motion.span
											className='ml-2'
											animate={{ rotate: 360 }}
											transition={{ ease: 'linear', duration: 2, repeat: Infinity }}>
											<FeatherIcon icon='refresh-cw' />
										</motion.span>
									)}
								</button>
							</div>
						</>
					)}
				</AnimatePresence>
			</div>
		</div>
	);
}

export default App;
