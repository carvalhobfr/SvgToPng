import React, { useState, useEffect } from 'react';
import html2canvas from 'html2canvas';

function SvgToPngConverter() {
  const [svgCode, setSvgCode] = useState('<svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="40" fill="red" /></svg>');
  const [imageSize, setImageSize] = useState(100);
  const [svgScale, setSvgScale] = useState(1);

  useEffect(() => {
    const svgContainer = document.getElementById('svg-container');
    const svgElement = svgContainer.querySelector('svg');

    if (svgContainer && svgElement) {
      const viewBox = svgElement.viewBox.baseVal || svgElement.getBoundingClientRect();
      const width = viewBox.width * svgScale;
      const height = viewBox.height * svgScale;

      svgContainer.style.width = `${width}px`;
      svgContainer.style.height = `${height}px`;
      svgContainer.style.overflow = 'hidden';

      svgElement.style.position = 'absolute';
      svgElement.style.top = '50%';
      svgElement.style.left = '50%';
      svgElement.style.transform = `translate(-50%, -50%) scale(${svgScale})`;
      svgElement.style.transformOrigin = 'center center';
    }
  }, [svgScale]);

  const handleSvgChange = (event) => {
    setSvgCode(event.target.value);
  };

  const handleImageSizeChange = (event) => {
    setImageSize(event.target.value);
  };

  const handleSvgScaleChange = (event) => {
    setSvgScale(event.target.value);
    if(event.target.value > 5) setSvgScale(5);
  };

  const convertSvgToPng = () => {
    const svgContainer = document.getElementById('svg-container');
    svgContainer.style.border = 'none';

    html2canvas(svgContainer, {
      logging: true,
      useCORS: true,
      backgroundColor: null,
    }).then((canvas) => {
      const dataUrl = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = `imagem-convertida.png`;
      link.href = dataUrl;
      link.click();
    }).catch((error) => {
      console.error('Erro ao converter SVG para PNG:', error);
    });
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
      <h1>SVG to PNG Converter</h1>
      <textarea value={svgCode} onChange={handleSvgChange} rows="10" style={{ width: '100%', fontFamily: 'sans-serif', marginBottom: '10px' }}></textarea>
      <div>
        {/* <label>
          Tamanho da Imagem (px):
          <input type="number" value={imageSize} onChange={handleImageSizeChange} style={{ marginRight: '10px' }}/>
        </label> */}
        <label>
          Escala do SVG (0.1x - 5x):
          <input type="number" value={svgScale} min={0.1} max={5} onChange={handleSvgScaleChange} step="0.1" />
        </label>
      </div>
      <button onClick={convertSvgToPng} style={{cursor: 'pointer' }}>Converter para PNG</button>
      <div id="svg-container" style={{ position: 'relative'}}>
        <div dangerouslySetInnerHTML={{ __html: svgCode }} />
      </div>
    </div>
  );
}

export default SvgToPngConverter;
