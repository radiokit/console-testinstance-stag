import {
  fromJS,
} from 'immutable';
import RadioKitDomain from '../RadioKitDomain';
import domainConfig from './VaultDomainConfig';

export function loadFile(id, options = {}) {
  RadioKitDomain.query(
    fromJS({
      key: domainConfig.key,
      app: 'vault',
      model: domainConfig.models.file,
      select: ['id', 'name', 'file_size', 'metadata_items'],
      conditions: [
        {
          field: 'id',
          comparison: 'eq',
          value: id,
        },
      ],
      joins: ['metadata_items'],
    }),
    {
      maxAge: 1000,
      ...options,
    }
  );
}
