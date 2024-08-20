document.addEventListener("alpine:init", () => {
  Alpine.data("flashcardApp", () => ({
    cards: [
      { text: "Bear", image: "" },
      { text: "Porcupine", image: "" },
      { text: "Animals", image: "" },
    ],
    currentIndex: 0,
    currentCard: { text: "", image: "" },
    images: [],
    creatorMode: false,

    init() {
      this.restoreCards();
      this.updateCard();
    },

    async loadImages(searchText) {
      const apiKey =
        localStorage.getItem("apiKey") || prompt("Enter your Pixabay API key");
      if (!localStorage.getItem("apiKey")) {
        localStorage.setItem("apiKey", apiKey);
      }
      const response = await fetch(
        `https://pixabay.com/api/?key=${apiKey}&q=${searchText}&image_type=photo`
      );
      const data = await response.json();
      this.images = data.hits.map((hit) => hit.webformatURL);
      this.currentCard.image = this.images[0];
      this.updateCard();
    },

    changeImage() {
      const index = this.images.indexOf(this.currentCard.image);
      const len = this.images.length - 1;
      this.currentCard.image = this.images[index < len ? index + 1 : len];
    },

    updateCard() {
      this.currentCard = this.cards[this.currentIndex];
    },
    prevCard() {
      this.images = [];
      this.currentIndex =
        (this.currentIndex - 1 + this.cards.length) % this.cards.length;
      this.updateCard();
    },
    nextCard() {
      this.images = [];
      this.currentIndex = (this.currentIndex + 1) % this.cards.length;
      this.updateCard();
    },

    saveCards() {
      localStorage.setItem("cards", JSON.stringify(this.cards));
    },

    restoreCards() {
      this.cards = JSON.parse(localStorage.getItem("cards")) || this.cards;
    },
    addCard() {
      this.cards.push({ text: "", image: "" });
      this.currentIndex = this.cards.length - 1;
      this.updateCard();
    },

    removeCard(index) {
      this.cards.splice(index, 1);

      if (this.currentIndex >= this.cards.length) {
        this.currentIndex = this.cards.length - 1;
      }

      this.updateCard();
    },
  }));
});
