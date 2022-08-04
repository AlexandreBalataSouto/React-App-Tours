import React, { useState, useEffect } from "react";
import "./App.css";
const url = "https://course-api.com/react-tours-project";

function App() {
  const [tours, setTours] = useState([]);
  const [text, setText] = useState("Loading...");
  const [isButtonRefresh, setIsButtonRefresh] = useState(false);

  async function getTours() {
    setIsButtonRefresh(false);
    setText("Loading...");
    setTimeout(function () {
      fetch(url)
        .then((resp) => {
          if (resp.status >= 200 && resp.status <= 299) {
            return resp.json();
          } else {
            setText("Error...");
            setIsButtonRefresh(false);
          }
        })
        .then((tours) => {
          setText("Our Tours");
          setTours(tours);
          setIsButtonRefresh(false);
        })
        .catch((error) => {
          setIsButtonRefresh(false);
          alert(error);
        });
    }, 1000);
  }

  function removeTour(id) {
    let itemSelected = tours.filter((item) => item.id != id);
    setTours(itemSelected);
    if (itemSelected.length <= 0) {
      setText("No Tours Left");
      setIsButtonRefresh(true);
    }
  }

  useEffect(() => {
    getTours();
  }, []);

  return (
    <main className="App">
      <section>
        <div className="title">
          <h2>{text}</h2>
        </div>
        <div className="tourList">
          {isButtonRefresh && <ButtonRefresh></ButtonRefresh>}
          {tours.map((item) => {
            return (
              <div key={item.id} className="cardTour">
                <img src={item.image} alt="image" />
                <div className="cardTour_info">
                  <div className="cardTour_namePrice">
                    <h4>{item.name}</h4>
                    <h4 className="tourPrice">${item.price}</h4>
                  </div>
                  <div className="cardTour_infoText">
                    <p>
                      <InfoTour info={item.info}></InfoTour>
                    </p>
                  </div>
                  <button
                    className="tourDeleteButton"
                    onClick={() => removeTour(item.id)}
                  >
                    Not interested
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );

  function ButtonRefresh() {
    return (
      <button className="btn" onClick={getTours}>
        Refresh
      </button>
    );
  }
  function InfoTour(props) {
    const [isReadMore, setIsReadMore] = useState(false);

    function toggleInfo() {
      setIsReadMore(!isReadMore);
    }

    if (isReadMore) {
      return (
        <>
          {props.info}{" "}
          <button className="tourButton" onClick={toggleInfo}>
            Show Less
          </button>
        </>
      );
    } else {
      return (
        <>
          {props.info.substring(0, 200) + "..."}
          <button className="tourButton" onClick={toggleInfo}>
            Read More
          </button>
        </>
      );
    }
  }
}

export default App;
