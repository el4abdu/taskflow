import mongoose from 'mongoose';

export interface ICategory {
  name: string;
  color: string;
  icon?: string;
  userId: mongoose.Types.ObjectId;
  createdAt: Date;
}

const categorySchema = new mongoose.Schema<ICategory>({
  name: {
    type: String,
    required: [true, 'Please provide a category name'],
    trim: true,
    maxlength: [50, 'Category name cannot be more than 50 characters'],
  },
  color: {
    type: String,
    default: '#0ea5e9', // Default to primary color
  },
  icon: {
    type: String,
    default: 'folder', // Default icon
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Please provide a user'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create index for faster queries
categorySchema.index({ userId: 1, name: 1 }, { unique: true });

const Category = mongoose.models.Category || mongoose.model<ICategory>('Category', categorySchema);

export default Category; 