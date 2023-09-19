let _componentBinding = (name: string, subName: string) => `
import 'package:tl_getx/tl_getx.dart';

import 'logic.dart';
import 'state.dart';

class ${name}Binding extends Binding {
  @override
  List<Bind> dependencies() {
    return [
      Bind.lazyPut<${name}Logic>(
          () => ${name}Logic(state: Get.arguments ??${name}State()),
          ),
    ];
  }
}
`;


export var componentBinding = _componentBinding;