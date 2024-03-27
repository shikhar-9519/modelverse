import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { faCaretDown, faCaretRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { BeatLoader } from 'react-spinners';

export default function ModelDetails() {
  const { id } = useParams();
  const [modelDetails, setModelDetails] = useState(null);
  const [showExampleCode, setShowExampleCode] = useState(false);
  const [loading,setLoading] = useState(false);

  useEffect(() => {
    fetchModelDetails();
  }, [id]);

  const toggleExampleCode = () => {
    setShowExampleCode(!showExampleCode);
  };

  const copyExampleCode = () => {
    navigator.clipboard.writeText(modelDetails.example_code);
    alert("Example code copied to clipboard!");
  };

  const fetchModelDetails = async () => {
    setLoading(true);
    try {
      const response = await fetch(`https://models-data.onrender.com/models/${id}`);
      const data = await response.json();
      setModelDetails(data);
    } catch (error) {
      console.error('Error fetching model details:', error);
    }
    setLoading(false);
  };

  return (
    <>
      {modelDetails ? (
        <div className="model-details-container">
          <h1 className="model-name">{modelDetails.name}</h1>
          <div className="model-info">
            <p><span className="info-label">Category:</span> {modelDetails.category}</p>
            <p><span className="info-label">Description:</span> {modelDetails.description}</p>
            <p><span className="info-label">Provider:</span> {modelDetails.provider}</p>
            <div>
              <span className="info-label">Use Cases:</span>
              <ul>
                {modelDetails.use_cases.map((useCase, index) => (
                  <li key={index}>{useCase}</li>
                ))}
              </ul>
            </div>
            <div className="example-code">
              <div className="code-header" onClick={toggleExampleCode}>
                <span className="info-label">Example Code</span>
                <FontAwesomeIcon icon={showExampleCode ? faCaretDown : faCaretRight} className={`caret-icon`} />
              </div>
              {showExampleCode && (
                <pre>{modelDetails.example_code}</pre>
              )}
              {showExampleCode && (
                <button className="copy-button" onClick={copyExampleCode}>Copy Code</button>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="loader-style">
          <BeatLoader
            color={"grey"}
            loading={loading}
            size={50}
            aria-label="Loading..."
            data-testid="loader"
          />
        </div>
      )}
    </>
  );
}
