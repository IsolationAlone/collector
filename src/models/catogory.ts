import { model, models, Schema } from "mongoose";

const catogorySchema = new Schema({
  name: {
    type: String,
    // ref: "User",
    required: [true, "Provide a name to your catogory"],
  },
  items: [
    {
      type: Schema.Types.ObjectId,
      ref: "Items",
    },
  ],
});

const Catogory = models.Catogory || model("Catogory", catogorySchema);

export default Catogory;
