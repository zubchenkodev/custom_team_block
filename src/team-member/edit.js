import { __ } from '@wordpress/i18n';

import { useBlockProps, RichText } from '@wordpress/block-editor';

const EditBlock = (props) => {
	const {attributes, setAttributes} = props;
	const {name, bio} = attributes;

	const onChangeName = (newName) => {
		setAttributes({name: newName})
	}

	const onChangeBio = (newBio) => {
		setAttributes({bio: newBio})
	}

	return (
		<div {...useBlockProps()}>
		<RichText
			title={__("Name", "viktorias-block")}
			placeholder={__("Enter the name", "viktorias-block")}
			tagName='h4'
			allowedFormats={[]}
			value={name}
			onChange={onChangeName}
		/>
		<RichText
			title={__("Bio", "viktorias-block")}
			placeholder={__("Enter the bio", "viktorias-block")}
			tagName='p'
			allowedFormats={[]}
			value={bio}
			onChange={onChangeBio}
		/>
		</div>
	);
}

export default EditBlock;
