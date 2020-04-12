import { dirname } from 'path';
import { IApi } from 'umi';

interface AntdPlusOpts {
  firstLibrary?: boolean;
}

export default (api: IApi) => {

  api.describe({
    key: 'antdPlus',
    config: {
      default: {
        firstLibrary: true
      },
      schema(joi) {
        return joi.object({
          firstLibrary: joi.boolean()
        });
      },
    },
  });

  const opts: AntdPlusOpts = api.userConfig.antdPlus || {};

  api.modifyBabelPresetOpts(opts => {
    return {
      ...opts,
      import: (opts.import || []).concat([
        { libraryName: '@alitajs/antd-plus', libraryDirectory: 'es', style: true }
      ])
    };
  });

  if (opts?.firstLibrary) {
    api.addProjectFirstLibraries(() => [
      {
        name: '@alitajs/antd-plus',
        path: dirname(require.resolve('@alitajs/antd-plus/package.json')),
      }
    ]);
  }
};
