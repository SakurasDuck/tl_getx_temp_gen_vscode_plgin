let _listBinding=(name:string,subName:string)=>`
import 'package:tl_getx/tl_getx.dart';

import 'logic.dart';

class ${name}Binding extends Binding {
  @override
  List<Bind> dependencies() {
    return [
      Bind.lazyPut<${name}Logic>(() => ${name}Logic()),
    ];
  }
}
`;

export var listBinding=_listBinding;