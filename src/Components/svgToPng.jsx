import React, { useState } from 'react';
import html2canvas from 'html2canvas';

function SvgToPngConverter() {
  const [svgCode, setSvgCode] = useState('<svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="40" fill="red" /></svg>');
  const [imageSize, setImageSize] = useState(100); // Tamanho da imagem PNG
  const [svgScale, setSvgScale] = useState(1); // Escala do SVG

  const handleSvgChange = (event) => {
    setSvgCode(event.target.value);
  };

  const handleImageSizeChange = (event) => {
    setImageSize(event.target.value);
  };

  const handleSvgScaleChange = (event) => {
    setSvgScale(event.target.value);
  };

  const convertSvgToPng = () => {
    const svgContainer = document.getElementById('svg-container');
    html2canvas(svgContainer, {
      scale: svgScale,
      logging: true,
      useCORS: true,
      backgroundColor: null, // Garante fundo transparente
    }).then((canvas) => {
      const dataUrl = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = `imagem-convertida-${imageSize}x${imageSize}.png`;
      link.href = dataUrl;
      link.click();
    }).catch((error) => {
      console.error('Erro ao converter SVG para PNG:', error);
    });
  };

  return (
    <div>
      <textarea value={svgCode} onChange={handleSvgChange} rows="10" cols="50"></textarea>
      <div>
        <label>
          Tamanho da Imagem (px):
          <input type="number" value={imageSize} onChange={handleImageSizeChange} />
        </label>
        <label>
          Escala do SVG:
          <input type="number" value={svgScale} onChange={handleSvgScaleChange} step="0.1" />
        </label>
      </div>
      <button onClick={convertSvgToPng}>Converter para PNG</button>
      <div id="svg-container" style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent' }} dangerouslySetInnerHTML={{ __html: svgCode }} />
    </div>
  );
}

export default SvgToPngConverter;
