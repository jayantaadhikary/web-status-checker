import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";

import { useState, useEffect } from "react";
import axios from "axios";

function InputForm() {
  const [url, setUrl] = useState("");
  const [clicked, setClicked] = useState(false);
  const [data, setData] = useState({
    link: "",
    status: "",
  });

  useEffect(() => {
    if (clicked === true) {
      getData();
      setClicked(false);
    }
  }, [clicked]);

  function formInputChangeHandler(e) {
    setUrl(e.target.value);
  }

  function getData() {
    axios.get(`${process.env.REACT_APP_SERVER_URL}/status`).then((res) => {
      setData(res.data);
    });
  }

  function submitButtonHandler(e) {
    let link = {
      link: `https://${url}`,
    };

    link = JSON.stringify(link);

    e.preventDefault();

    if (url === "") {
      alert("Please enter a URL!");
      return;
    }

    axios
      .post(`${process.env.REACT_APP_SERVER_URL}/check`, link, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        setClicked(true);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <>
      <div className="d-flex justify-content-center">
        <InputGroup className="mb-3 w-25">
          <InputGroup.Text id="basic-addon3">https://</InputGroup.Text>
          <Form.Control
            id="basic-url"
            aria-describedby="basic-addon3"
            placeholder="Website URL"
            onChange={formInputChangeHandler}
            value={url}
          />
        </InputGroup>
        <div>
          <Button
            className="ms-2 mb-3 mt-1 text-center"
            variant="secondary"
            type="submit"
            size="sm"
            onClick={submitButtonHandler}
          >
            {" "}
            Submit!
          </Button>
        </div>
      </div>
      {data.status && data.link ? (
        <div className=" d-flex flex-column align-items-center">
          <p>
            <strong>Link:</strong>{" "}
            <a href={data.link} target="_blank" rel="noreferrer">
              {data.link}
            </a>
          </p>
          <p>
            <strong>Status:</strong>{" "}
            {data.status === "up" ? "Website is up!" : "Website is down!"}
          </p>
        </div>
      ) : null}
    </>
  );
}

export default InputForm;
