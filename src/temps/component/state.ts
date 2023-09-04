let _componentState=(name:string,subName:string)=>`
import 'package:tl_getx/tl_getx.dart';

class ${name}State {
  const ${name}State();

}
`;

export var componentState=_componentState;