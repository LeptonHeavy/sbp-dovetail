sbp-dovetail
============

Generates and adds dovetails to your SBP format toolpath.

This app is very simple JavaScript/HTML that runs locally in your browser. Tested in Mozilla & Chrome -
probably won't work in IE.

Allows you to select a local sbp file, select which toolpath are the line segments
are the dovetail baselines and generate the sbp code necessary for cutting them.

To Use:
1) Open the index.html file in your browser

2) Click the 'Browse...' button and select a sbp (ShopBot Toolpath) file

3) Select the toolpath the has the guide vectors for the dovetail slots

4) Enter the parameters for generating the dovetail geometry

5) Click 'Update Preview' to see the generated geometry

6) Click 'Generate SBP' to create a the output file

Note that the output file will replace the guide vector toolpath selected in step 3 with the sbp commands for creating
the dovetail geometry.

For additional information on the motivation for this project see:
   http://www.talkshopbot.com/forum/showthread.php?t=18998

For info on the sbp language and file format see:
  http://www.opensbp.com/

The three.js library is required for generating the backplot for the sbp.
jQuery is also in there but will probably be pulled out to simplify things and reduce dependencies.

