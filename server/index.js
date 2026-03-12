import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { Resend } from "resend";

dotenv.config({ path: ".env.local" });
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: "256kb" }));

const port = Number(process.env.PORT || process.env.CONTACT_PORT || 3001);
const apiKey = process.env.RESEND_API_KEY || "";
const toEmail = process.env.CONTACT_TO_EMAIL || "hello.lechappeedemma@gmail.com";
const fromEmail = process.env.CONTACT_FROM_EMAIL || "onboarding@resend.dev";
const googlePlacesApiKey = process.env.GOOGLE_PLACES_API_KEY || "";
const googlePlaceId = process.env.GOOGLE_PLACE_ID || "ChIJm2NF0mML5kcRXlMfFIy36ew";

app.get("/api/health", (_req, res) => {
  res.json({ ok: true });
});

app.get("/api/reviews", async (_req, res) => {
  if (!googlePlacesApiKey) {
    return res.status(500).json({ ok: false, error: "Google Places API key is missing on server." });
  }

  try {
    const response = await fetch(`https://places.googleapis.com/v1/places/${googlePlaceId}?languageCode=fr`, {
      headers: {
        "X-Goog-Api-Key": googlePlacesApiKey,
        "X-Goog-FieldMask": "displayName,rating,userRatingCount,reviews",
      },
    });
    const data = await response.json();

    if (!response.ok) {
      return res.status(502).json({
        ok: false,
        error: data.error?.message || `Google Places request failed (${response.status}).`,
      });
    }

    const reviews = Array.isArray(data.reviews)
      ? data.reviews.map((review, index) => ({
          id: String(review.publishTime || index),
          author: review.authorAttribution?.displayName || "Voyageur",
          rating: Number(review.rating || 0),
          text: review.text?.text || "",
          date: review.relativePublishTimeDescription || "Récemment",
        }))
      : [];

    res.setHeader("Cache-Control", "public, max-age=900");
    return res.json({
      ok: true,
      place: {
        name: data.displayName?.text || "L'échappée d'Emma",
        rating: Number(data.rating || 0),
        userRatingsTotal: Number(data.userRatingCount || 0),
      },
      reviews,
    });
  } catch (error) {
    console.error("Google Places error", error);
    return res.status(500).json({ ok: false, error: "Unable to fetch Google reviews." });
  }
});

app.post("/api/contact", async (req, res) => {
  const { name, email, phone, subject, message } = req.body || {};

  if (!name || !email || !message) {
    return res.status(400).json({ ok: false, error: "Missing required fields." });
  }

  if (!apiKey) {
    return res.status(500).json({ ok: false, error: "Server not configured." });
  }

  const resend = new Resend(apiKey);
  const cleanSubject = String(subject || "").trim() || `Contact de ${name}`;
  const text = [
    `Nom: ${name}`,
    `Email: ${email}`,
    `Telephone: ${phone || ""}`,
    "",
    "Message:",
    String(message || "").trim(),
  ].join("\n");

  try {
    await resend.emails.send({
      from: fromEmail,
      to: [toEmail],
      subject: cleanSubject,
      replyTo: email,
      text,
    });

    return res.json({ ok: true });
  } catch (error) {
    console.error("Resend error", error);
    return res.status(500).json({ ok: false, error: "Email send failed." });
  }
});

app.post("/api/quote", async (req, res) => {
  const {
    title,
    name,
    email,
    phone,
    destination,
    departDate,
    returnDate,
    budget,
    adults,
    children,
    duration,
    travelParty,
    description,
  } = req.body || {};

  if (!name || !email || !destination || !departDate) {
    return res.status(400).json({ ok: false, error: "Missing required fields." });
  }

  if (!apiKey) {
    return res.status(500).json({ ok: false, error: "Server not configured." });
  }

  const resend = new Resend(apiKey);
  const cleanSubject = `Demande de voyage sur mesure - ${destination}`;
  const text = [
    "Nouvelle demande de voyage sur mesure",
    "",
    `Titre: ${title || ""}`,
    `Nom: ${name}`,
    `Email: ${email}`,
    `Telephone: ${phone || ""}`,
    "",
    `Destination: ${destination}`,
    `Date de depart: ${departDate}`,
    `Date de retour: ${returnDate || ""}`,
    `Duree: ${Number.isFinite(duration) ? duration + " jours" : ""}`,
    `Budget par personne: ${budget || ""} EUR`,
    `Adultes: ${Number.isFinite(adults) ? adults : ""}`,
    `Enfants: ${Number.isFinite(children) ? children : ""}`,
    `Qui sera du voyage: ${travelParty || ""}`,
    "",
    "Description:",
    String(description || "").trim(),
  ].join("\n");

  try {
    await resend.emails.send({
      from: fromEmail,
      to: [toEmail],
      subject: cleanSubject,
      replyTo: email,
      text,
    });

    return res.json({ ok: true });
  } catch (error) {
    console.error("Resend error", error);
    return res.status(500).json({ ok: false, error: "Email send failed." });
  }
});

app.listen(port, () => {
  console.log(`Contact API listening on http://localhost:${port}`);
});

app.post("/api/feedback", async (req, res) => {
  const { rating, ratingLabel, comment, email } = req.body || {};

  if (!rating) {
    return res.status(400).json({ ok: false, error: "Missing rating." });
  }

  if (!apiKey) {
    return res.status(500).json({ ok: false, error: "Server not configured." });
  }

  const resend = new Resend(apiKey);
  const cleanSubject = `Avis utilisateur — ${ratingLabel || rating}/5`;
  const text = [
    "Nouvel avis utilisateur",
    "",
    `Note: ${rating}/5 (${ratingLabel || ""})`,
    "",
    "Commentaire:",
    String(comment || "(aucun)").trim(),
    "",
    `Email de contact: ${email || "(non renseigné)"}`,
  ].join("\n");

  try {
    await resend.emails.send({
      from: fromEmail,
      to: [toEmail],
      subject: cleanSubject,
      replyTo: email || undefined,
      text,
    });

    return res.json({ ok: true });
  } catch (error) {
    console.error("Resend feedback error", error);
    return res.status(500).json({ ok: false, error: "Email send failed." });
  }
});
