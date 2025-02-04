const TextVerify = ({ page, highlightedTexts = [], notes = [] }) => {
  let modifiedText = page?.content;

  // Filter highlights based on the page
  const pageHighlights = highlightedTexts.text.filter(
    (highlight) => highlight.page === page?.page
  );

  pageHighlights.forEach(({ text: word }) => {
    const regex = new RegExp(word, "gi");
    modifiedText = modifiedText?.replace(
      regex,
      (match) =>
        `<span style="background-color: ${
          highlightedTexts.backgroundColor || "#FFFF99"
        }">${match}</span>`
    );
  });

  // Filter notes based on the page
  const pageNotes = notes.filter((note) => note.page === page?.page);

  pageNotes.forEach((note) => {
    const regex = new RegExp(note.text, "gi");
    modifiedText = modifiedText?.replace(
      regex,
      (match) =>
        `<span class="tooltipTitle">${match}<span class="tooltip">${match}<span class="tooltipContent">${note.note}</span></span></span>`
    );
  });

  return modifiedText;
};

export default TextVerify;
