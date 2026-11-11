require "fastimage"

module Jekyll
  class GalleryGenerator < Generator
    safe true
    priority :lowest

    SUPPORTED_EXTENSIONS = %w[.jpg .jpeg .png .gif .webp].freeze

    def generate(site)
      gallery_directory = File.join(site.source, "assets", "img", "gallery")
      return unless Dir.exist?(gallery_directory)

      filenames = Dir.children(gallery_directory).select do |filename|
        SUPPORTED_EXTENSIONS.include?(File.extname(filename).downcase)
      end
      files_by_normalized_name = filenames.to_h do |filename|
        [filename.unicode_normalize(:nfc), filename]
      end

      metadata = {}
      ordered_filenames = Array(site.data["gallery"]).filter_map do |entry|
        next unless entry.is_a?(Hash) && entry["image"]

        normalized_name = File.basename(entry["image"]).unicode_normalize(:nfc)
        filename = files_by_normalized_name[normalized_name]
        next unless filename
        next if metadata.key?(normalized_name)

        metadata[normalized_name] = entry
        filename
      end
      ordered_filenames.concat((filenames - ordered_filenames).sort)

      site.data["gallery"] = ordered_filenames.map do |filename|

        image_path = File.join(gallery_directory, filename)
        dimensions = FastImage.size(image_path)
        raise Errors::FatalException, "Could not read dimensions for gallery image: #{filename}" unless dimensions

        details = metadata[filename.unicode_normalize(:nfc)] || {}
        {
          "image" => filename,
          "width" => dimensions[0],
          "height" => dimensions[1],
          "alt" => details["alt"],
          "caption" => details["caption"]
        }.compact
      end
    end
  end
end