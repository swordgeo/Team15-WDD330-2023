import { renderListWithTemplate } from "./utils.mjs";

function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

function alertCardTemplate(alert) {
  return `<p class="alert-card" style="color:${alert.color};background-color:${alert.background}">
    ${alert.message}</p>`;
}

export default class Alert {
  constructor() {
    this.path = "../json/alerts.json";
    this.data = this.getData();
  }
  // Get alert data from alert.json
  getData() {
    return fetch(this.path)
      .then(convertToJson)
      .then((data) => data);
  }

  async init() {
    const alerts = await this.getData();
    this.renderAlerts(alerts);
  }
  // Create alert section if there are alerts to display
  createAlertSection() {
    let section = document.createElement("section");
    section.setAttribute("class", "alert-list");
    document
      .querySelector(".mission")
      .insertAdjacentElement("beforeBegin", section);
    return section;
  }
  // Render Alters and append them to section.
  renderAlerts(alerts) {
    if (alerts) {
      let section = this.createAlertSection();
      renderListWithTemplate(alertCardTemplate, section, alerts);
    }
  }
}
