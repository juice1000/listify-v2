function Form() {
  function handleSubmit(e: any) {
    e.preventDefault();
    // Read the form data
    const form = e.target;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());
    console.log('submitted: ', formJson.playlist);

    // TODO: sanitize data
    // must match regex pattern of playlist!
  }
  return (
    <div>
      <form className="my-6 w-full flex gap-4" onSubmit={handleSubmit}>
        <input className="p-2 rounded-md w-1/2" placeholder="Paste your playlist link here..." name="playlist" />
        <input className="bg-black py-2 px-6 rounded-md text-white" type="submit" />
      </form>
    </div>
  );
}

export default Form;
