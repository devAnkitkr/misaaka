import { useState, useEffect, forwardRef, useImperativeHandle } from 'react';

const SnackBar = forwardRef((props, ref) => {
  const [showSnackBar, setShowSnackBar] = useState(false);

  useImperativeHandle(ref, () => ({
    show() {
      setShowSnackBar(true);
      setTimeout(() => {
        setShowSnackBar(false);
      }, 4000);
    },
  }));

  useEffect(() => {
    return () => {
      setShowSnackBar(false);
    };
  }, []);

  return (
    <div
      className={`fixed flex z-50 min-w-[350px] h-[50px] items-center justify-center text-white font-semibold left-[50%] -translate-x-[50%] -translate-y-[50%] rounded px-5 transition-[top] ease-in-out duration-300 ${
        showSnackBar ? 'top-10' : '-top-10'
      } ${props.type == 'SUCCESS' ? 'bg-teal-500 ' : 'bg-rose-600'} `}
      id="snackbar"
    >
      <div className="">{props.message}</div>
    </div>
  );
});
SnackBar.displayName = 'SnackBar';
export default SnackBar;
