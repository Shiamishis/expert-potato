import homeButton from "../images/homeButton.svg";
function CreateJoinGroup(props) {
  const setCreateJoin = props.setCreateJoin;

  function goToHome() {
    setCreateJoin(false);
  }

  return (
    <>
      <div>Hello World!</div>
      <button
        onClick={goToHome}
        style={{
          height: "30px",
          border: "none",
          backgroundColor: "transparent",
        }}
      >
        <img
          src={homeButton}
          className={"homeButton"}
          alt={"Home Button"}
          style={{ height: "30px", backgroundColor: "none" }}
        />
      </button>
    </>
  );
}

export default CreateJoinGroup;
