import { Layout } from "../components/Layout";
import "../index.css";
import { useState, useEffect } from "react";
import img1 from "../assets/img1.jpg";
import img2 from "../assets/img2.jpg";
import img3 from "../assets/img3.jpg";

const Launching = () => {
  const [current, setCurrent] = useState(0);
  const images = [img1, img2, img3];

  const pollNames = ["exp", "drop", "pack", "rr", "guilo", "off"];
  const options = {
    exp: ["X1", "X5", "X10", "X25"],
    drop: ["10%", "15%", "30%", "45%"],
    pack: ["Sí, por 48hs", "Solo un Panda", "No, sin nada"],
    rr: ["Sin RR, level 1000", "Sin RR, level 400", "Con RR, limite semnal", "Con RR, sin límite"],
    guilo: ["Máx. 10", "Máx. 15", "Máx. 20"],
    off: ["Si a ambos", "Solo Off Attack", "Solo Off Store", "Ninguno"],
  };

  const [votes, setVotes] = useState({});
  const [results, setResults] = useState({});

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    if (query.get("") === "admin") {
      localStorage.removeItem("pollVotes");
      localStorage.removeItem("pollResults");
      setVotes({});
      setResults({});
      return;
    }

    const storedVotes = JSON.parse(localStorage.getItem("pollVotes")) || {};
    const storedResults = JSON.parse(localStorage.getItem("pollResults")) || {};
    setVotes(storedVotes);
    setResults(storedResults);
  }, []);

  const handleVote = (pollName, selectedOption) => {
    if (votes[pollName]) return;

    const updatedVotes = { ...votes, [pollName]: selectedOption };
    const pollResult = results[pollName] || {};
    const updatedPollResult = {
      ...pollResult,
      [selectedOption]: (pollResult[selectedOption] || 0) + 1,
    };

    const updatedResults = {
      ...results,
      [pollName]: updatedPollResult,
    };

    setVotes(updatedVotes);
    setResults(updatedResults);
    localStorage.setItem("pollVotes", JSON.stringify(updatedVotes));
    localStorage.setItem("pollResults", JSON.stringify(updatedResults));

    // ✅ Enviar el voto al backend de tu VPS
    fetch("http://208.67.222.222:4000/api/vote", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        poll: pollName,
        option: selectedOption,
      }),
    });
  };

  const getTotalVotes = (pollName) => {
    return Object.values(results[pollName] || {}).reduce((a, b) => a + b, 0);
  };

  const getPercentage = (pollName, option) => {
    const total = getTotalVotes(pollName);
    const count = results[pollName]?.[option] || 0;
    return total > 0 ? ((count / total) * 100).toFixed(1) : 0;
  };

  const handlePrev = () => {
    setCurrent((current - 1 + images.length) % images.length);
  };

  const handleNext = () => {
    setCurrent((current + 1) % images.length);
  };

  return (
    <Layout>
      <div className="launching-background">
        <div className="launching-text">
          <h1 className="launching-title">HARD SERVER 2028</h1>
          <h2 className="launching-subtitle">99B CLÁSICO</h2>
        </div>
      </div>

      <section className="welcome-section">
        <h2>Bienvenidos</h2>
        <p>
          Esta es una web previa a tener la oficial del servidor.<br />
          El objetivo es ir reuniendo datos y que vayas viendo cómo, poco a poco, este proyecto toma forma.<br />
          ¡Gracias por formar parte de esta aventura!
        </p>

        <h3 className="gallery-title">GALERÍA</h3>
        <div className="carousel">
          <button className="carousel-button" onClick={handlePrev}>⟨</button>
          <img src={images[current]} alt={`Screenshot ${current + 1}`} className="carousel-image" />
          <button className="carousel-button" onClick={handleNext}>⟩</button>
        </div>
      </section>

      <section className="poll-section">
        <h2>ENCUESTAS</h2>
        <div className="poll-container">
          {pollNames.map((poll) => (
            <div className={`poll-card ${votes[poll] ? 'voted' : ''}`} key={poll}>
              <p>{{
                exp: "¿QUÉ EXPERIENCIA JUGÁS?",
                drop: "¿QUÉ DROP JUGÁS?",
                pack: "¿PACK DE BIENVENIDA?",
                rr: "¿RESETS?",
                guilo: "¿MIEMBROS POR GUILO?",
                off: "¿OFF ATTACK Y OFF STORE?",
              }[poll]}</p>

              {options[poll].map((opt) => (
                <label
                  key={opt}
                  className={`custom-radio-container ${votes[poll] === opt ? "selected" : ""}`}
                >
                  <input
                    type="radio"
                    name={poll}
                    value={opt}
                    disabled={!!votes[poll]}
                    checked={votes[poll] === opt}
                    onChange={() => handleVote(poll, opt)}
                  />
                  <span className="custom-radio-checkmark"></span>
                  <span className="option-text">{opt}</span>

                  {votes[poll] === opt && (
                    <span className="percentage-text">{getPercentage(poll, opt)}%</span>
                  )}
                </label>
              ))}
            </div>
          ))}
        </div>
      </section>
    </Layout>
  );
};

export { Launching };
