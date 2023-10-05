import { Tooltip } from 'react-tooltip';
import { useState } from 'react';

export interface FormProps {
  onSubmit: (e: string) => void;
}

function Form(props: FormProps) {
  const [open, setIsOpen] = useState(false);
  const [blocked, setIsBlocked] = useState(false); // when we start downloading a playlist we block the button click
  const [debounced, setIsDebounced] = useState(false);

  function openAndCloseTooltip() {
    if (!debounced) {
      setIsOpen(true);
      setIsDebounced(true);
      setTimeout(() => {
        setIsOpen(false);
        setIsDebounced(false);
      }, 2000);
    }
  }

  function handleSubmit(e: any) {
    e.preventDefault();
    // Read the form data
    const form = e.target;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());
    const playlistLink = formJson.playlist.toString();

    // match regex pattern of playlist
    if (playlistLink !== '') {
      const re = new RegExp('https:\\/\\/open\\.spotify\\.com\\/playlist\\/[A-Za-z0-9]{22}\\?si=[A-Za-z0-9]{16}');
      const matchedString = playlistLink.match(re);
      if (matchedString) {
        e.target.reset();
        props.onSubmit(matchedString[0]);
        setIsBlocked(true);
      } else {
        openAndCloseTooltip();
      }
    } else {
      openAndCloseTooltip();
    }
  }
  return (
    <div>
      <form
        className="my-6 w-full flex gap-4"
        onSubmit={handleSubmit}
        data-tooltip-id="error-tooltip"
        data-tooltip-content="Invalid Input"
        data-tooltip-place="bottom-start"
      >
        <input className="p-3 rounded-full w-3/4" placeholder="Paste your playlist link here..." name="playlist" />
        <input
          className="enabled:hover:bg-black bg-transparent border-2 border-black px-6 rounded-full enabled:hover:text-white font-bold enabled:cursor-pointer disabled:bg-black/40 disabled:border-none"
          type="submit"
          value="Start Download"
          disabled={blocked}
        />
        <Tooltip id="error-tooltip" style={{ backgroundColor: 'red', color: 'white' }} isOpen={open} />
      </form>
    </div>
  );
}

export default Form;
