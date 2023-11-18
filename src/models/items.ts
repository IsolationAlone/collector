import { model, models, Schema } from "mongoose";

const itemsSchema = new Schema({
  name: {
    type: String,
    required: [true, "Provide a name please"],
  },
  subCatogory: {
    type: String,
  },
  catogory: {
    type: String,
    ref: "Catogory",
    required: [true, ""],
  },
  quotes: [
    {
      type: String,
    },
  ],
});

const Items = models.Items || model("Items", itemsSchema);

export default Items;
