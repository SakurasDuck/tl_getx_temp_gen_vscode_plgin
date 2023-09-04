let _componentView=(name:string,subName:string)=>`
import 'package:flutter/material.dart';
import 'package:tl_package/tl_package.dart';

import 'logic.dart';
import 'state.dart';


class ${name}View extends GetSView<${name}State,${name}Logic> {
   const ${name}View({super.tag,super.key});

  @override
  Widget build(BuildContext context) {
    //todo coding view
    return Container();
  }
}
`;

export var componentView=_componentView;