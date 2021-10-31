import { useGameContext } from 'context';
import React from 'react';

const FigurePicker: React.FC = () => {
    const { picker, utils } = useGameContext();

    return (
        <div className="picker">
            {
                picker.map((figure, index) => {
                    return (
                        <div className="picker__figure soldier" key={index}>
                            <img src={figure.image}/>
                            {utils.shouldGenerateRankWeight(figure) && (
                                <strong className='soldier__rank'>{figure.rankWeight}</strong>
                            )}
                        </div>
                    )
                })
            }
        </div>
    )
}

export { FigurePicker };