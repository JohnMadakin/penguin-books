import iziToast from 'izitoast';

const toastNotify = (type, title, message, position) => {
  return iziToast[type]({
    title,
    message,
    position
  });
}

export default toastNotify;
