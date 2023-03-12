import { validateAndFormatDate } from './validateAndFormatDate';
import { createTitle } from './trimToFirstCapital';
import { EditableContentModel } from '../models/EditableContentModel';
import { DataObjectModel } from '../models/DataObjectModel';
import { FormattedDataObjectModel } from '../models/FormattedDataObjectModel';

export const validateAndFormatDataMapper = (
  item: DataObjectModel,
): FormattedDataObjectModel => {
  const newItem: Record<string, unknown> = {};
  const content: EditableContentModel = { id: item.id, key: '', title: '', value: '' };

  for (const [key, value] of Object.entries(item)) {
    if (typeof value === 'string') {
      const date = validateAndFormatDate(value);
      newItem[key] = date ?? value;
      if (!date) {
        content.key = key;
        content.title = createTitle(key);
        content.value = value;
      }
    } else if (key !== 'active') {
      newItem[key] = value;
    }
  }
  return { ...newItem, key: item.id, status: item.active ? 'active' : '', content };
};
