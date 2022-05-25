// import mongoose from "mongoose";
// import { IPopulate } from "@interfaces";

// export class BaseModel {
//   public returnNew = { useFindAndModify: false, new: true };

//   constructor(public model: mongoose.Model<any>) {}

//   create<T>(document: any): Promise<T> {
//     return this.model.create(document);
//   }

//   find<T>(populate?: IPopulate): Promise<T[]> {
//     return populate
//       ? this.model.find().populate(populate).exec()
//       : this.model.find().exec();
//   }

//   findById<T>(id: string, populate?: IPopulate): Promise<T> {
//     return populate
//       ? this.model.findById(id).populate(populate).exec()
//       : this.model.findById(id).exec();
//   }

//   findOne<T>(query: any, populate?: IPopulate): Promise<T> {
//     return populate
//       ? this.model.findOne(query).populate(populate).exec()
//       : this.model.findOne(query).exec();
//   }

//   findMany<T>(query: any, populate?: IPopulate): Promise<T[] | T> {
//     return populate
//       ? this.model.find(query).populate(populate).exec()
//       : this.model.find(query).exec();
//   }

//   updateById<T>(id: string, document: any, populate?: IPopulate): Promise<T> {
//     return populate
//       ? this.model
//           .findByIdAndUpdate(id, document, this.returnNew)
//           .populate(populate)
//           .exec()
//       : this.model
//           .findByIdAndUpdate(id, document, this.returnNew)
//           .populate(populate)
//           .exec();
//   }

//   deleteById<T>(id: string): Promise<T> {
//     return this.model.findByIdAndDelete(id).exec();
//   }
// }
