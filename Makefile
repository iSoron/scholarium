src     := src/
package := dist/package.nw

pack:
	@rm -f $(package)
	@zip -r $(package) $(src)
