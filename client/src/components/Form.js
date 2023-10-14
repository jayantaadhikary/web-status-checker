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
    axios.get("http://localhost:5000/status").then((res) => {
      setData(res.data);
    });
  }

  function submitButtonHandler(e) {
    let link = {
      link: `http://${url}`,
    };

    link = JSON.stringify(link);

    e.preventDefault();

    if (url === "") {
      alert("Please enter a URL!");
      return;
    }

    axios
      .post("http://localhost:5000/check", link, {
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
      <Button
        variant="secondary"
        type="submit"
        size="sm"
        onClick={submitButtonHandler}
      >
        {" "}
        Submit!
      </Button>
      {data.status && data.link ? (
        <div>
          <p>
            <strong>Link:</strong> {data.link}
          </p>
          <p>
            <strong>Status:</strong> {data.status}
          </p>
        </div>
      ) : null}
    </>
  );
}

export default InputForm;