class ISS {
  async getNow() {
    const result = await fetch('http://api.open-notify.org/iss-now.json');

    if (!result.ok) {
      throw new Error(`HTTP error! status: ${result.status}`);
    }

    return await result.json();
  }
}

module.exports = ISS;
