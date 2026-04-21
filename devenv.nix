{
  pkgs,
  lib,
  config,
  ...
}:
{
  languages.python = {
    enable = true;
    uv = {
      enable = true;
    };
  };

  # https://devenv.sh/packages/
  packages = [
    pkgs.lefthook
    pkgs.just
  ];

}

